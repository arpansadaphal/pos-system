"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rbac_1 = require("../middleware/rbac");
const router = express_1.default.Router();
// Only MANAGER + ADMIN can view inventory
router.get("/", authMiddleware_1.protect, (0, rbac_1.authorize)("MANAGER", "ADMIN"), inventoryController_1.getInventoryLogs);
router.get("/summary", authMiddleware_1.protect, (0, rbac_1.authorize)("MANAGER", "ADMIN"), inventoryController_1.getInventorySummary);
router.post("/restock", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN", "MANAGER"), inventoryController_1.restock);
exports.default = router;
//# sourceMappingURL=inventoryRoutes.js.map