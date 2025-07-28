"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401)
                .json({ message: "Authentication required" });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403)
                .json({ message: 'Access denied: permission error' });
            return;
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
exports.default = exports.authorizationMiddleware;
