import InventoryLedger from "../models/InventoryLedger";

export const getInventoryLogsService = async () => {
  const logs = await InventoryLedger.find()
    .populate("productId", "name")
    .populate("storeId", "name")
    .sort({ createdAt: -1 }) // latest first
    .limit(100); // prevent overload

  return logs;
};

// export const getInventorySummaryService = async () => {
//   const summary = await InventoryLedger.aggregate([
//     {
//       $group: {
//         _id: "$productId",
//         totalStock: { $sum: "$change" },
//       },
//     },
//     {
//       $lookup: {
//         from: "products",
//         localField: "_id",
//         foreignField: "_id",
//         as: "product",
//       },
//     },
//     {
//       $unwind: "$product",
//     },
//     {
//       $project: {
//         productName: "$product.name",
//         totalStock: 1,
//       },
//     },
//   ]);

//   return summary;
// };

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