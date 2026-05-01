import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";
import Order from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
    try{
        const order = await createOrderService(req.body);
        //  console.log(req.body);
        res.json(order);
       
    } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
    }
};


export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
    }
};