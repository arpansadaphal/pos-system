"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const productService_1 = require("../services/productService");
const createProduct = async (req, res) => {
    try {
        const product = await (0, productService_1.createProductService)(req.body);
        res.json(product);
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
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await (0, productService_1.getProductsService)(req.query);
        res.json(products);
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
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await (0, productService_1.updateProductService)(id, req.body);
        res.json(product);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await (0, productService_1.deleteProductService)(id);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map