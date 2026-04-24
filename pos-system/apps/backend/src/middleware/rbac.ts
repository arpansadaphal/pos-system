export const authorize = (...roles: string[] ) => {
    return (req: any,res: any,next: any) => {
        if(!roles.includes(req.user.roles)){
            return res.status(403).send("Forbidden");
        }
        next();
    };
};