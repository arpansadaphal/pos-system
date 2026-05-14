"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItemController_1 = require("../controllers/orderItemController");
const router = express_1.default.Router();
router.get("/", orderItemController_1.getOrderItems);
// router.get("/", (req, res) => {
//   res.send("Order Items route works");
// });
exports.default = router;
//# sourceMappingURL=orderItemRoutes.js.map