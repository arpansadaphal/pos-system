import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    cashierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalAmount: Number,
    status: {
      type: String,
      default: "COMPLETED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);