import Product from "../models/Product"

export const createProductService = async (data: any) => {
    return await Product.create(data);
}

// export const getProductsService = async () => {
//     return await Product.find();
// }


export const getProductsService = async (query: any) => {
  const { search, cursor, limit = 10 } = query;

  const filter: any = {};

  // 🔍 Full-text search
  if (search) {
    filter.$text = { $search: search };
  }

  // 📄 Cursor-based pagination
  if (cursor) {
    filter._id = { $gt: cursor };
  }

  const products = await Product.find(filter)
    .limit(Number(limit))
    .sort({ _id: 1 });

  return products;
};