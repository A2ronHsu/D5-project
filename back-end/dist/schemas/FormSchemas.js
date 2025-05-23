"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodigoValidation = exports.entradaPosicionesValidation = void 0;
const entradaPosicionesValidation = (input) => {
    const { codigo, pasillo, bloco, secuencia } = input;
    if (!codigo || !pasillo || !bloco || !secuencia)
        throw new Error("invalid input");
    return { codigo, pasillo, bloco, secuencia };
};
exports.entradaPosicionesValidation = entradaPosicionesValidation;
const getCodigoValidation = (input) => {
    const { codigo } = input;
    if (!codigo)
        throw new Error("invalid input");
    return codigo;
};
exports.getCodigoValidation = getCodigoValidation;
