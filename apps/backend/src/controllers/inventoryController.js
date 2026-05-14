"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restock = exports.getInventorySummary = exports.getInventoryLogs = void 0;
const inventoryService_1 = require("../services/inventoryService");
const getInventoryLogs = async (req, res) => {
    try {
        const logs = await (0, inventoryService_1.getInventoryLogsService)();
        res.json(logs);
    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Failed to fetch inventory logs",
        });
    }
};
exports.getInventoryLogs = getInventoryLogs;
const getInventorySummary = async (req, res) => {
    try {
        const data = await (0, inventoryService_1.getInventorySummaryService)();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch summary" });
    }
};
exports.getInventorySummary = getInventorySummary;
const restock = async (req, res) => {
    try {
        const result = await (0, inventoryService_1.restockService)(req.body);
        res.json(result);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};
exports.restock = restock;
//# sourceMappingURL=inventoryController.js.map