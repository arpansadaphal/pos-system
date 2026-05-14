"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderItems = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const getOrderItems = async (req, res) => {
    try {
        const { orderId } = req.query;
        // ✅ Validate
        if (!orderId || typeof orderId !== "string") {
            return res.status(400).json({ message: "Invalid orderId" });
        }
        // ✅ Convert to ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(orderId);
        const items = await OrderItem_1.default.find({ orderId: objectId })
            .populate("productId");
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getOrderItems = getOrderItems;
//# sourceMappingURL=orderItemController.js.map