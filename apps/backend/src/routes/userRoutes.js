"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rbac_1 = require("../middleware/rbac");
const router = express_1.default.Router();
// ADMIN only
router.post("/", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN"), userController_1.createUser);
router.get("/", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN"), userController_1.getUsers);
router.patch("/:id/toggle", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN"), userController_1.toggleUserStatus);
// router.get("/store/:storeId", protect, authorize("ADMIN"), getUsersByStore);
;
exports.default = router;
//# sourceMappingURL=userRoutes.js.map