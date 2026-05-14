"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStores = exports.storeController = void 0;
const storeService_1 = require("../services/storeService");
const Store_1 = __importDefault(require("../models/Store"));
const storeController = async (req, res) => {
    try {
        const store = await (0, storeService_1.createStoreService)(req.body);
        res.json(store);
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
exports.storeController = storeController;
const getStores = async (req, res) => {
    try {
        const stores = await Store_1.default.find();
        res.json(stores);
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
exports.getStores = getStores;
//# sourceMappingURL=storeController.js.map