"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthSchemas_1 = require("../4schemas/AuthSchemas");
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            const userRegistration = (0, AuthSchemas_1.validadeUserRegistration)(req.body);
            const response = await this.authService.register(userRegistration);
            res.status(200);
            res.json(response);
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(err.statusCode).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.json({ error: "unknown error" });
            }
        }
    }
    async login(req, res) {
        try {
            const userLogin = (0, AuthSchemas_1.validadeUserLogin)(req.body);
            const response = await this.authService.login(userLogin);
            res.status(200).cookie("token", response.loginToken, {
                httpOnly: true,
                maxAge: 18000000, // 5h expiration in miliseconds,
                sameSite: "lax", //Protects againd CSRF,
                path: '/', // Accessible across the whole domain.
            })
                .json({
                message: "logged in",
                userName: response.userName
            });
        }
        catch (err) {
            if (err instanceof requestErrorHandler_1.default) {
                res.status(400).json({
                    name: err.name,
                    message: err.message
                });
            }
            else {
                res.status(400).json({
                    error: "unknow error on login"
                });
            }
        }
    }
}
exports.default = AuthController;
