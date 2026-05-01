import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import storeRoutes from "./routes/storeRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
// import Product from "./models/Product";


dotenv.config();
// console.log("REDIS_URL:", process.env.REDIS_URL);
// console.log("REDIS_TOKEN:", process.env.REDIS_TOKEN);
const app = express();

app.use(
  cors({
    origin: "*", // allow all (for now)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("POS System API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/inventory", inventoryRoutes);



// app.get("/test", async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// app.post("/test-product", async (req, res) => {
//   const product = await Product.create({
//     name: "Test Product",
//     category: "Clothing",
//     price: 999,
//   });

//   res.json(product);
// });

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));