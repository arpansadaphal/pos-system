import jwt from "jsonwebtoken";

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

export const protect = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token");
  }

  // const token = authHeader.split(" ")[1]; // 🔥 IMPORTANT
  const token = req.headers.authorization?.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("Decoded user:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};