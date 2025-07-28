"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authenticationMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new requestErrorHandler_1.default(401, 'denied', 'credentials denied');
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    }
    catch (err) {
        console.error("token verification failed", err);
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: "token expired" });
        }
        ;
        if (err instanceof requestErrorHandler_1.default) {
            res.status(err.statusCode).json({
                name: err.name,
                message: err.message
            });
        }
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json(err);
            return;
        }
        res.status(401).json({ message: "unknown token error" });
    }
};
exports.default = authenticationMiddleware;
