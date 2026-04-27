import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createOrder } from "../controllers/orderController";
import { authorize } from "../middleware/rbac";
const router = express.Router();

router.post("/", protect, authorize("CASHIER") ,createOrder);

export default router;