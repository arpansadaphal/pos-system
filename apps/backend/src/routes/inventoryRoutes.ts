import express from "express";
import { getInventoryLogs, getInventorySummary} from "../controllers/inventoryController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";

const router = express.Router();

// Only MANAGER + ADMIN can view inventory
router.get(
  "/",
  protect,
  authorize("MANAGER", "ADMIN"),
  getInventoryLogs
);

router.get(
  "/summary",
  protect,
  authorize("MANAGER", "ADMIN"),
  getInventorySummary
);

export default router;