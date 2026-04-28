import { Request, Response } from "express";
import { createStoreService } from "../services/storeService";

export const storeController = async (req: Request, res: Response) => {
    try {
        const store = await createStoreService(req.body);
        res.json(store);

    } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};