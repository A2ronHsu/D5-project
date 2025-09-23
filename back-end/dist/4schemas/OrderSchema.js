"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderJsonValidation = void 0;
const requestErrorHandler_1 = __importDefault(require("./requestErrorHandler"));
const OrderJsonValidation = (input) => {
    input.forEach(order => {
        let { nota, comentario, codigoCliente, nombreCliente, fecha, hora, printStatus, deposito, codigoVendedor, nombreVendedor } = order;
        const notNullandTypeCheck = !!nota && typeof (nota) == 'string' && !!codigoCliente && typeof (codigoCliente) == 'string' && !!nombreCliente && typeof (nombreCliente) == 'string' && !!fecha && typeof (fecha) == 'string' && !!hora && typeof (hora) == 'string' && !!printStatus && typeof (printStatus) == 'string' && !!deposito && typeof (deposito) == 'string' && !!codigoVendedor && typeof (codigoVendedor) == 'string' && !!nombreVendedor && typeof (nombreVendedor) == 'string';
        if (!notNullandTypeCheck) {
            throw new requestErrorHandler_1.default(400, "type error", "b81ec3dc");
        }
        if (!comentario)
            comentario = '';
        if (!/^\d+$/.test(nota))
            throw new requestErrorHandler_1.default(400, "error", "009e6c77");
        if (!/^\d\d-\d\d-\d\d\d\d$/.test(fecha))
            throw new requestErrorHandler_1.default(400, "error", "b3afe692");
        if (!/^\d\d:\d\d:\d\d$/.test(hora))
            throw new requestErrorHandler_1.default(400, "error", "11092604");
    });
    return input;
};
exports.OrderJsonValidation = OrderJsonValidation;
