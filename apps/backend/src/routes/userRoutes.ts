import express from "express";
import { createUser, getUsers } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";

const router = express.Router();

// ADMIN only
router.post("/", protect, authorize("ADMIN"), createUser);
router.get("/", protect, authorize("ADMIN"), getUsers);

export default router;