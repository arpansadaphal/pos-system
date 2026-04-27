import express from "express";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";
import { createProduct, getProducts } from "../controllers/productController";

const router = express.Router();


router.post("/", protect, authorize("ADMIN", "MANAGER"), createProduct);
router.get("/", protect, getProducts);

export default router;