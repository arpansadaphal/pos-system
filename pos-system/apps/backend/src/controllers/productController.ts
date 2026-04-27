import { Request, Response } from "express";
import { createProductService, getProductsService } from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);
    res.json(product);
  }catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getProductsService(req.query);
    res.json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};