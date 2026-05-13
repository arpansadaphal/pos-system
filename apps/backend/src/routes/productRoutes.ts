import express from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController";
import Product from "../models/Product";

const router = express.Router();


router.post("/", protect, authorize("ADMIN", "MANAGER"), createProduct);
router.get("/", protect, getProducts);
router.put(
  "/:id",
  protect,
  authorize("ADMIN", "MANAGER"),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorize("ADMIN"),
  deleteProduct
);

export default router;