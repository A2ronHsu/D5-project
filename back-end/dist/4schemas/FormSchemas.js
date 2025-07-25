"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodigoValidation = exports.entradaPosicionesValidation = void 0;
const requestErrorHandler_1 = __importDefault(require("./requestErrorHandler"));
const entradaPosicionesValidation = (input) => {
    const { codigo, pasillo, bloco, secuencia, dep } = input;
    if (!codigo || !pasillo || !bloco || !secuencia || !dep) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "invalid Input");
        throw error;
    }
    ;
    return { codigo, pasillo, bloco, secuencia, dep };
};
exports.entradaPosicionesValidation = entradaPosicionesValidation;
const getCodigoValidation = (input) => {
    const { codigo, dep } = input;
    if (!codigo || !dep) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "Invalid Input");
        throw error;
    }
    ;
    return { codigo, dep };
};
exports.getCodigoValidation = getCodigoValidation;
