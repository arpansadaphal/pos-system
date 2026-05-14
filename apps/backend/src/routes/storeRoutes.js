"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const rbac_1 = require("../middleware/rbac");
const storeController_1 = require("../controllers/storeController");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN"), storeController_1.storeController);
router.get("/", authMiddleware_1.protect, (0, rbac_1.authorize)("ADMIN"), storeController_1.getStores);
exports.default = router;
//# sourceMappingURL=storeRoutes.js.map