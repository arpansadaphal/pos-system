"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const protect =  (req: any, res: any, next: any) => {
//     const token = req.headers.authorization;
//     if (!token) return req.status(401).send("No token")
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         req.user = decoded;
//         next();
//     }catch(err){
//         return res.status(401).send("invalid token");
//     }
// }
const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("No token");
    }
    // const token = authHeader.split(" ")[1]; // 🔥 IMPORTANT
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Extracted token:", token); // 🔥 DEBUGGING
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded user:", decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid token");
    }
};
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map