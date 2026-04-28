import mongoose from "mongoose";

const inventoryLedgerSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      index: true,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      index: true,
    },
    change: Number, // +10 or -5
    type: {
      type: String,
      enum: ["SALE", "RESTOCK"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("InventoryLedger", inventoryLedgerSchema);