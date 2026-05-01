import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createOrder, getOrders } from "../controllers/orderController";
// import { getOrderItems } from "../controllers/orderItemController";
import { authorize } from "../middleware/rbac";
const router = express.Router();

router.post("/", protect, authorize("CASHIER") ,createOrder);
router.get("/", protect, getOrders);
// router.get("/", getOrderItems);

export default router;