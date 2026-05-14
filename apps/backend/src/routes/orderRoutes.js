"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const orderController_1 = require("../controllers/orderController");
// import { getOrderItems } from "../controllers/orderItemController";
const rbac_1 = require("../middleware/rbac");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, (0, rbac_1.authorize)("CASHIER"), orderController_1.createOrder);
router.get("/", authMiddleware_1.protect, orderController_1.getOrders);
// router.get("/", getOrderItems);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map