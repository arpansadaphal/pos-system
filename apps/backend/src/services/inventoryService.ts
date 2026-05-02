import InventoryLedger from "../models/InventoryLedger";
import mongoose from "mongoose";

export const getInventoryLogsService = async () => {
  const logs = await InventoryLedger.find()
    .populate("productId", "name")
    .populate("storeId", "name")
    .sort({ createdAt: -1 }) // latest first
    .limit(100); // prevent overload

  return logs;
};

export const getInventorySummaryService = async () => {
  const summary = await InventoryLedger.aggregate([
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

export const restockService = async (data: any) => {
  const { productId, storeId, quantity } = data;

  return await InventoryLedger.create({
    productId,
    storeId,
    change: quantity,
    type: "RESTOCK",
  });
};

export const getStockService = async (
  productId: string,
  storeId: string,
  session?: any
) => {
  const result = await InventoryLedger.aggregate(
    [
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
          storeId: new mongoose.Types.ObjectId(storeId),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$change" },
        },
      },
    ],
    { session }
  );

  return result[0]?.total || 0;
};