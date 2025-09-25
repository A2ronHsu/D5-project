"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estragadoValidation = exports.transferValidation = exports.getCodigoValidation = exports.entradaPosicionesRecebimientosValidation = exports.entradaPosicionesValidation = void 0;
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
const entradaPosicionesRecebimientosValidation = (input) => {
    const { codigo, packingList, unidadPosicion } = input;
    if (!codigo || !packingList || !unidadPosicion) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "invalid Input");
        throw error;
    }
    ;
    return { codigo, packingList, unidadPosicion };
};
exports.entradaPosicionesRecebimientosValidation = entradaPosicionesRecebimientosValidation;
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
const transferValidation = (input) => {
    let { fecha, dep, codigo, bloco, cantidad } = input;
    if (!fecha || !dep || !codigo || !bloco || !cantidad) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "Invalid Input");
        throw error;
    }
    ;
    bloco = Number(bloco);
    cantidad = Number(cantidad);
    return { fecha, dep, codigo, bloco, cantidad };
};
exports.transferValidation = transferValidation;
const estragadoValidation = (input) => {
    let { codigo, dep, descripcion, cantidad } = input;
    if (!codigo || !dep || !cantidad || !descripcion) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "Invalid Input");
        throw error;
    }
    ;
    cantidad = Number(cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
        let error = new requestErrorHandler_1.default(400, "Input Error", "Invalid Input: 'cantidad' must be a positive number");
        throw error;
    }
    return { codigo, dep, descripcion, cantidad };
};
exports.estragadoValidation = estragadoValidation;
