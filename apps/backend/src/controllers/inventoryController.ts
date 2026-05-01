import { Request, Response } from "express";
import { getInventoryLogsService, getInventorySummaryService } from "../services/inventoryService";

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