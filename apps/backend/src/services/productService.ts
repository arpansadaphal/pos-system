import Product from "../models/Product"

export const createProductService = async (data: any) => {
    return await Product.create(data);
}

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
// import Product from "../models/Product";

export const getProductsService = async (query: any) => {
  const redis = getRedisClient(); // ✅ inside function

  const { search = "", limit = 10 } = query;
  const cacheKey = `products:${search}:${limit}`;

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

  const products = await Product.find(filter).limit(Number(limit));

  // 3. Store in cache
  await redis.set(cacheKey, products, { ex: 60 });

  return products;
};