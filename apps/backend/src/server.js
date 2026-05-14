"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const orderItemRoutes_1 = __importDefault(require("./routes/orderItemRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import Product from "./models/Product";
dotenv_1.default.config();
// console.log("REDIS_URL:", process.env.REDIS_URL);
// console.log("REDIS_TOKEN:", process.env.REDIS_TOKEN);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // allow all (for now)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("POS System API Running");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/stores", storeRoutes_1.default);
app.use("/api/orders", orderRoutes_1.default);
app.use("/api/order-items", orderItemRoutes_1.default);
app.use("/api/inventory", inventoryRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
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
const PORT = process.env.PORT || 5001;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=server.js.map