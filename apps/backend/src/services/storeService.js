"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreService = void 0;
const Store_1 = __importDefault(require("../models/Store"));
const createStoreService = async (data) => {
    return await Store_1.default.create(data);
};
exports.createStoreService = createStoreService;
//# sourceMappingURL=storeService.js.map