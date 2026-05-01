import express from "express";
import { getOrderItems } from "../controllers/orderItemController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getOrderItems);
// router.get("/", (req, res) => {
//   res.send("Order Items route works");
// });

export default router;