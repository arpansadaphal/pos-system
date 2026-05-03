import express from "express";
import { createUser, getUsers, toggleUserStatus } from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbac";

const router = express.Router();

// ADMIN only
router.post("/", protect, authorize("ADMIN"), createUser);
router.get("/", protect, authorize("ADMIN"), getUsers);
router.patch("/:id/toggle", protect, authorize("ADMIN"), toggleUserStatus);

export default router;