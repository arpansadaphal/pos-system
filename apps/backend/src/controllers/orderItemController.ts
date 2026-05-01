import { Request, Response } from "express";
import mongoose from "mongoose";
import OrderItem from "../models/OrderItem";

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.query;

    // ✅ Validate
    if (!orderId || typeof orderId !== "string") {
      return res.status(400).json({ message: "Invalid orderId" });
    }

    // ✅ Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(orderId);

    const items = await OrderItem.find({ orderId: objectId })
      .populate("productId");

    res.json(items);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};