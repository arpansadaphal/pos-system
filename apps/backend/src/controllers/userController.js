"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleUserStatus = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (req, res) => {
    try {
        const { email, password, role, storeId } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const existing = await User_1.default.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({
            email,
            password: hashed,
            role,
            storeId,
        });
        res.json(user);
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
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find()
            .select("-password") // 🔐 never send password
            .populate("storeId", "name"); // optional but useful
        res.json(users);
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
exports.getUsers = getUsers;
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.isActive = !user.isActive;
        await user.save();
        res.json(user);
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
exports.toggleUserStatus = toggleUserStatus;
// export const getUsersByStore = async (req: Request, res: Response) => {
//   try {
//     const { storeId } = req.params;
//     const users = await User.find({ storeId })
//       .select("-password")
//       .populate("storeId", "name");
//     res.json(users);
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//         res.status(500).json({ message: err.message });
//     } else {
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }
// };
//# sourceMappingURL=userController.js.map