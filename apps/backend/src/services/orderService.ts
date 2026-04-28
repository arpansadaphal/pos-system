import mongoose from "mongoose"
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import InventoryLedger from "../models/InventoryLedger";
import { error } from "node:console";

export const createOrderService = async (data: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        const {items, storeId, cashierId} = data;
        console.log("Items:", items);
        if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array");
        }
        //create order

       const orderDoc = new Order({
        storeId,
        cashierId,
        totalAmount: 0,
        });

        await orderDoc.save({ session });

        let totalAmount = 0;

        //process each item
        for(const item of items){
            const {productId, price, quantity} = item;
            console.log("Processing item:", item);
            totalAmount += quantity * price;

            if(quantity <= 0){
                throw new Error("Invalid quantity");
            }
            
        //create order item
        await OrderItem.create(
            [
                {
                    orderId: orderDoc._id,
                    productId,
                    quantity,
                    price,
                }
            ], {session}
        );
        //log inventory change
        await InventoryLedger.create(
            [
                {
                    productId,
                    storeId,
                    change: -quantity,
                    type: "SALE",
                }
            ], {session}
        );
    }

        // update total
        
        orderDoc.totalAmount = totalAmount;
        await orderDoc.save({ session });

        await session.commitTransaction();
        await session.endSession();

        return orderDoc;
    
    }catch(err){
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
};