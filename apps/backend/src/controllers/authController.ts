import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";


export const signup = async (req: Request, res: Response) => {
  try{
    const { name, email, password, role, storeId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
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
  }catch(error){
    res.status(500).json({message: "Sign up failed", error});
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // const token = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "1d" }
    // );
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        storeId: user.storeId, // 🔥 ADD THIS
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // ✅ BEST PRACTICE RESPONSE
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "login failed", error });
  }
};

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
