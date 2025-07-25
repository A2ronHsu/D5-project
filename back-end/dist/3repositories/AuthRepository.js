"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestErrorHandler_1 = __importDefault(require("../4schemas/requestErrorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthRepository {
    Users = [
        {
            id: "123456789",
            userName: "depositero",
            email: "depositore@email.com",
            password: "$2b$10$kA1Fwfm6dllHGDilPcoHlu7nZS8Hr3ZHhwPdWncqrIw4dW3groZcm",
            role: 'depositero'
        }
    ];
    constructor() {
    }
    async register(userRegistration) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(userRegistration.password, 10);
            const newUser = {
                id: "1111",
                userName: userRegistration.username,
                email: userRegistration.email,
                password: hashedPassword,
                role: "depositero"
            };
            this.Users.push(newUser);
            console.log(this.Users);
            return "User registered";
        }
        catch (err) {
            throw new requestErrorHandler_1.default(500, "register error");
        }
    }
    getUserByEmail(email) {
        return this.Users.find(user => email == user.email);
    }
}
exports.default = AuthRepository;
