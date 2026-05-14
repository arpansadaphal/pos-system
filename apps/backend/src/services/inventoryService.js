"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockService = exports.restockService = exports.getInventorySummaryService = exports.getInventoryLogsService = void 0;
const InventoryLedger_1 = __importDefault(require("../models/InventoryLedger"));
const mongoose_1 = __importDefault(require("mongoose"));
const getInventoryLogsService = async () => {
    const logs = await InventoryLedger_1.default.find()
        .populate("productId", "name")
        .populate("storeId", "name")
        .sort({ createdAt: -1 }) // latest first
        .limit(100); // prevent overload
    return logs;
};
exports.getInventoryLogsService = getInventoryLogsService;
const getInventorySummaryService = async () => {
    const summary = await InventoryLedger_1.default.aggregate([
        {
            $group: {
                _id: "$productId",
                totalStock: { $sum: "$change" },
                totalSales: {
                    // $sum: {
                    //   $cond: [{ $eq: ["$type", "SALE"] }, -"$change", 0],
                    // },
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "SALE"] },
                            { $abs: "$change" },
                            0,
                        ],
                    },
                },
                lastUpdated: { $max: "$createdAt" },
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },
        {
            $project: {
                productName: "$product.name",
                totalStock: 1,
                totalSales: 1,
                lastUpdated: 1,
            },
        },
    ]);
    return summary;
};
exports.getInventorySummaryService = getInventorySummaryService;
const restockService = async (data) => {
    const { productId, storeId, quantity } = data;
    return await InventoryLedger_1.default.create({
        productId,
        storeId,
        change: quantity,
        type: "RESTOCK",
    });
};
exports.restockService = restockService;
const getStockService = async (productId, storeId, session) => {
    const result = await InventoryLedger_1.default.aggregate([
        {
            $match: {
                productId: new mongoose_1.default.Types.ObjectId(productId),
                storeId: new mongoose_1.default.Types.ObjectId(storeId),
            },
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$change" },
            },
        },
    ], { session });
    console.log("checking stock for productId:", productId, "storeId:", storeId, "result:", result);
    return result[0]?.total || 0;
};
exports.getStockService = getStockService;
//# sourceMappingURL=inventoryService.js.map