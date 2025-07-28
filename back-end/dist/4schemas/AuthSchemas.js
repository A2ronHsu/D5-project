"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validadeUserLogin = exports.validadeUserRegistration = void 0;
const requestErrorHandler_1 = __importDefault(require("./requestErrorHandler"));
const validadeUserRegistration = (reqBody) => {
    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
        throw new requestErrorHandler_1.default(400, "bad Input", "bad request");
    }
    return { username, email, password };
};
exports.validadeUserRegistration = validadeUserRegistration;
const validadeUserLogin = (reqBody) => {
    const { email, password } = reqBody;
    if (!email || !password) {
        throw new requestErrorHandler_1.default(400, "bad input");
    }
    return { email, password };
};
exports.validadeUserLogin = validadeUserLogin;
