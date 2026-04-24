import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  sku: { type: String, unique: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    category: { type: String, index: true },
    price: Number,

    variants: [variantSchema],
  },
  { timestamps: true }
);

// Full-text search index
productSchema.index({ name: "text", category: "text" });

export default mongoose.model("Product", productSchema);