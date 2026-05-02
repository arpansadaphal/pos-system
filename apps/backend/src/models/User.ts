import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["CASHIER", "MANAGER", "ADMIN"],
      default: "CASHIER",
    },
    storeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Store",
}

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);