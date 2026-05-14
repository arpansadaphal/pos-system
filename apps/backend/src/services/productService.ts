import Product from "../models/Product"

// export const createProductService = async (data: any) => {
//     return await Product.create(data);
// }

export const createProductService = async (data: any) => {
  const { name, price, storeId, initialStock = 0 } = data;

  const product = await Product.create({ name, price });

  // 🔥 Add initial stock entry
  if (initialStock > 0) {
    await InventoryLedger.create({
      productId: product._id,
      storeId,
      change: initialStock,
      type: "RESTOCK",
    });
  }

  return product;
};

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
import { getRedisClient } from "../config/redis";
import InventoryLedger from "../models/InventoryLedger";
import mongoose from "mongoose";
// import Product from "../models/Product";

export const getProductsService = async (query: any) => {
  const redis = getRedisClient(); // ✅ inside function

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
  const filter: any = {};

  if (search) {
    filter.$text = { $search: search };
  }

  // const products = await Product.find(filter).limit(Number(limit));
  
  const products = await Product.aggregate([
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
                    new mongoose.Types.ObjectId(storeId),
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

export const updateProductService = async (
  id: string,
  data: any
) => {
  const product = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const deleteProductService = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return { message: "Product deleted" };
};