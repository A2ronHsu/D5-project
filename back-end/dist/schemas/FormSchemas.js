"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodigoValidation = exports.entradaPosicionesValidation = void 0;
const requestErrorHandler_1 = __importDefault(require("./requestErrorHandler"));
const entradaPosicionesValidation = (input) => {
    const { codigo, pasillo, bloco, secuencia } = input;
    if (!codigo || !pasillo || !bloco || !secuencia) {
        let error = new requestErrorHandler_1.default(400, "invalid Input");
        error.name = "Input Error";
        throw error;
    }
    ;
    return { codigo, pasillo, bloco, secuencia };
};
exports.entradaPosicionesValidation = entradaPosicionesValidation;
const getCodigoValidation = (input) => {
    const { codigo } = input;
    if (!codigo) {
        let error = new requestErrorHandler_1.default(400, "Invalid Input");
        error.name = "Input Error";
        throw error;
    }
    ;
    return codigo;
};
exports.getCodigoValidation = getCodigoValidation;
