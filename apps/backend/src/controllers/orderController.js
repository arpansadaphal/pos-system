"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const orderService_1 = require("../services/orderService");
const Order_1 = __importDefault(require("../models/Order"));
const createOrder = async (req, res) => {
    try {
        const order = await (0, orderService_1.createOrderService)(req.body);
        //  console.log(req.body);
        res.json(order);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
};
exports.getOrders = getOrders;
//# sourceMappingURL=orderController.js.map