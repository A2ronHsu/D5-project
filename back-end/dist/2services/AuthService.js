"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async register(userRegistration) {
        const emailExist = !!this.authRepository.getUserByEmail(userRegistration.email);
        if (emailExist)
            throw new requestErrorHandler_1.default(409, "Email already registered");
        else {
            const hashedPassword = await bcrypt_1.default.hash(userRegistration.password, 10);
            userRegistration.password = hashedPassword;
            return await this.authRepository.register(userRegistration);
        }
        ;
    }
    async login(userLogin) {
        const user = this.authRepository.getUserByEmail(userLogin.email);
        if (!user)
            throw new requestErrorHandler_1.default(401, "credential error");
        const isPasswordValid = await bcrypt_1.default.compare(userLogin.password, user.password);
        if (!isPasswordValid)
            throw new requestErrorHandler_1.default(401, "credential error");
        const secret = process.env.JWT_SECRET;
        const loginToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: "3h" });
        return { loginToken, userName: user.userName };
    }
}
exports.default = AuthService;
