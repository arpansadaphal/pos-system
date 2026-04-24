import jwt from "jsonwebtoken";

export const protect =  (req: any, res: any, next: any) => {
    const token = req.headers.authorization;

    if (!token) return req.status(401).send("No token")
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).send("invalid token");
    }
}