import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role, storeId } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role,
      storeId,
    });

    res.json(user);
  }catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};



export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("-password") // 🔐 never send password
      .populate("storeId", "name"); // optional but useful

    res.json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};


export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
        res.status(500).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }
}
};

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