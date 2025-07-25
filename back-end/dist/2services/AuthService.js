"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async register(userRegistration) {
        const emailExist = !!this.authRepository.getUserByEmail(userRegistration.email);
        if (emailExist)
            throw new requestErrorHandler_1.default(409, "Email already registered");
        else
            return await this.authRepository.register(userRegistration);
    }
}
exports.default = AuthService;
