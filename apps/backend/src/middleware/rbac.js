"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).send("Forbidden");
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=rbac.js.map