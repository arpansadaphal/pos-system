"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const variantSchema = new mongoose_1.default.Schema({
    size: String,
    color: String,
    sku: { type: String, unique: true, sparse: true },
    //   sku: {
    //   type: String,
    //   unique: true,
    //   sparse: true, 
    // },
});
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, index: true },
    category: { type: String, index: true },
    price: Number,
    variants: [variantSchema],
}, { timestamps: true });
// Full-text search index
productSchema.index({ name: "text", category: "text" });
exports.default = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=Product.js.map