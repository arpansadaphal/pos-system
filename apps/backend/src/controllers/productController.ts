import { Request, Response } from "express";
import { createProductService, getProductsService, updateProductService, deleteProductService } from "../services/productService";

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


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const product = await updateProductService(
      id,
      req.body
    );

    res.json(product);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const result = await deleteProductService(id);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    });
  }
};