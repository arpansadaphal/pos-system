"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("../models/Order"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const InventoryLedger_1 = __importDefault(require("../models/InventoryLedger"));
const inventoryService_1 = require("./inventoryService");
const createOrderService = async (data) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    // const user = await User.findById(cashierId);
    //     if (!user?.isActive) {
    //     throw new Error("User is inactive");
    //     }
    try {
        const { items, storeId, cashierId } = data;
        console.log("Items:", items);
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error("Items must be a non-empty array");
        }
        //create order
        const orderDoc = new Order_1.default({
            storeId,
            cashierId,
            totalAmount: 0,
        });
        await orderDoc.save({ session });
        let totalAmount = 0;
        //process each item
        //     for(const item of items){
        //         const {productId, price, quantity} = item;
        //         console.log("Processing item:", item);
        //         totalAmount += quantity * price;
        //         if(quantity <= 0){
        //             throw new Error("Invalid quantity");
        //         }
        //     //create order item
        //     await OrderItem.create(
        //         [
        //             {
        //                 orderId: orderDoc._id,
        //                 productId,
        //                 quantity,
        //                 price,
        //             }
        //         ], {session}
        //     );
        //     const currentStock = await getStockService(productId, storeId, session);
        //     if (currentStock < quantity) {
        //     throw new Error("Insufficient stock");
        //     }
        //     //log inventory change
        //     await InventoryLedger.create(
        //         [
        //             {
        //                 productId,
        //                 storeId,
        //                 change: -quantity,
        //                 type: "SALE",
        //             }
        //         ], {session}
        //     );
        // }
        for (const item of items) {
            const { productId, price, quantity } = item;
            if (quantity <= 0) {
                throw new Error("Invalid quantity");
            }
            const currentStock = await (0, inventoryService_1.getStockService)(productId, storeId, session);
            if (currentStock < quantity) {
                throw new Error("Insufficient stock");
            }
            totalAmount += quantity * price;
            await OrderItem_1.default.create([
                {
                    orderId: orderDoc._id,
                    productId,
                    quantity,
                    price,
                },
            ], { session });
            await InventoryLedger_1.default.create([
                {
                    productId,
                    storeId,
                    change: -quantity,
                    type: "SALE",
                },
            ], { session });
        }
        // update total
        orderDoc.totalAmount = totalAmount;
        await orderDoc.save({ session });
        await session.commitTransaction();
        await session.endSession();
        return orderDoc;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }
};
exports.createOrderService = createOrderService;
//# sourceMappingURL=orderService.js.map