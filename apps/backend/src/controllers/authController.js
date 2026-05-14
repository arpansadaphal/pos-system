"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = async (req, res) => {
    try {
        const { name, email, password, role, storeId } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            role,
            storeId, // 🔥 ADD THIS
        });
        res.json(user);
        // res.json({
        //   id: user._id,
        //   email: user.email,
        //   role: user.role,
        // });
    }
    catch (error) {
        res.status(500).json({ message: "Sign up failed", error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(404).send("User not found");
        if (!user.isActive) {
            return res.status(403).json({ message: "User is deactivated" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).send("Invalid credentials");
        // const token = jwt.sign(
        //   { id: user._id, role: user.role },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: "1d" }
        // );
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role,
            storeId: user.storeId, // 🔥 ADD THIS
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // ✅ BEST PRACTICE RESPONSE
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "login failed", error });
    }
};
exports.login = login;
// export const login = async (req: Request, res: Response) => {
//    try {
//      const {email, password} = req.body;
//       // Validation
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }
//     const user = await User.findOne({email});
//     if (!user) return res.status(404).send("User not found");
//     const isMatch = await bcrypt.compare(password, user.password as string);
//     if (!isMatch) return res.status(400).send("Invalid credentials");
//     const token = jwt.sign(
//         {id: user._id, role: user.role },
//         process.env.JWT_SECRET as string,
//         {expiresIn: "1d"}
//     );
//     res.json(token);
//    }catch(error){
//     res.status(500).json({message : "loggin failed", error});
//    }
// }
//# sourceMappingURL=authController.js.map