"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const authorizationMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            console.log("authorization error: no authentication");
            res.status(401)
                .json({ message: "error a1f06d5e" });
            return;
        }
        if (!roles.includes(req.user.role)) {
            console.error("authorization error: role error");
            res.status(403)
                .json({ message: 'error f66bca45fea5' });
            return;
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
exports.default = exports.authorizationMiddleware;
