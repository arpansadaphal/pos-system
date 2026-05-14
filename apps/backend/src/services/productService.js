"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.getProductsService = exports.createProductService = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// export const createProductService = async (data: any) => {
//     return await Product.create(data);
// }
const createProductService = async (data) => {
    const { name, price, storeId, initialStock = 0 } = data;
    const product = await Product_1.default.create({ name, price });
    // 🔥 Add initial stock entry
    if (initialStock > 0) {
        await InventoryLedger_1.default.create({
            productId: product._id,
            storeId,
            change: initialStock,
            type: "RESTOCK",
        });
    }
    return product;
};
exports.createProductService = createProductService;
// export const getProductsService = async () => {
//     return await Product.find();
// }
//no redis
// export const getProductsService = async (query: any) => {
//   const { search, cursor, limit = 10 } = query;
//   const filter: any = {};
//   // 🔍 Full-text search
//   if (search) {
//     filter.$text = { $search: search };
//   }
//   // 📄 Cursor-based pagination
//   if (cursor) {
//     filter._id = { $gt: cursor };
//   }
//   const products = await Product.find(filter)
//     .limit(Number(limit))
//     .sort({ _id: 1 });
//   return products;
// };
//with redis
const redis_1 = require("../config/redis");
const InventoryLedger_1 = __importDefault(require("../models/InventoryLedger"));
const mongoose_1 = __importDefault(require("mongoose"));
// import Product from "../models/Product";
const getProductsService = async (query) => {
    const redis = (0, redis_1.getRedisClient)(); // ✅ inside function
    const { search = "", storeId, limit = 10 } = query;
    // const cacheKey = `products:${search}:${limit}`;
    const cacheKey = `products:${storeId}:${search}:${limit}`;
    // 1. Check cache
    const cached = await redis.get(cacheKey);
    if (cached) {
        console.log("⚡ Cache HIT");
        return cached;
    }
    console.log("🐢 Cache MISS");
    // 2. Query DB
    const filter = {};
    if (search) {
        filter.$text = { $search: search };
    }
    // const products = await Product.find(filter).limit(Number(limit));
    const products = await Product_1.default.aggregate([
        {
            $match: filter,
        },
        {
            $lookup: {
                from: "inventoryledgers",
                let: { productId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$productId", "$$productId"] },
                                    {
                                        $eq: [
                                            "$storeId",
                                            new mongoose_1.default.Types.ObjectId(storeId),
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "inventory",
            },
        },
        {
            $addFields: {
                stock: {
                    $sum: "$inventory.change",
                },
            },
        },
        {
            $limit: Number(limit),
        },
    ]);
    // 3. Store in cache
    await redis.set(cacheKey, products, { ex: 60 });
    return products;
};
exports.getProductsService = getProductsService;
const updateProductService = async (id, data) => {
    const product = await Product_1.default.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (id) => {
    const product = await Product_1.default.findByIdAndDelete(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return { message: "Product deleted" };
};
exports.deleteProductService = deleteProductService;
//# sourceMappingURL=productService.js.map