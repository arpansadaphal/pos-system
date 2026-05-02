import { Request, Response } from "express";
import { getInventoryLogsService, getInventorySummaryService, restockService } from "../services/inventoryService";

export const getInventoryLogs = async (req: Request, res: Response) => {
  try {
    const logs = await getInventoryLogsService();
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Failed to fetch inventory logs",
    });
  }
};

export const getInventorySummary = async (req: Request, res: Response)=> {
  try {
    const data = await getInventorySummaryService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

export const restock = async (req: Request, res: Response) => {
  try {
    const result = await restockService(req.body);
    res.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
    }
};