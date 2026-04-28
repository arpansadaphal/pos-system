import { Request, Response } from "express";
import { createOrderService } from "../services/orderService";

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