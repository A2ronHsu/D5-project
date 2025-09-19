import { request } from "express"
import { OrderJson } from "../5models/OrderModels";
import ResponseErrorHandler from "./requestErrorHandler";


export const OrderJsonValidation  = (input: OrderJson[]) : OrderJson[] => {
   input.forEach(order => {
      let {
         nota,
         comentario,
         codigoCliente,
         nombreCliente,
         fecha,
         hora,
         printStatus,
         deposito,
         codigoVendedor,
         nombreVendedor
      } = order;

      const notNullandTypeCheck : boolean = !!nota && typeof (nota) == 'string' && !!codigoCliente && typeof (codigoCliente) == 'string'&& !!nombreCliente && typeof (nombreCliente) == 'string'&& !!fecha && typeof (fecha) == 'string'&& !!hora && typeof (hora) == 'string'&& !!printStatus && typeof (printStatus) == 'string'&& !!deposito && typeof (deposito) == 'string'&& !!codigoVendedor && typeof (codigoVendedor) == 'string'&& !!nombreVendedor && typeof (nombreVendedor) == 'string'

      if ( !notNullandTypeCheck) {
         throw new ResponseErrorHandler(400, "type error", "b81ec3dc")
      }

      if (!comentario ) comentario = '';
      if (!/^\d+$/.test(nota)) throw new ResponseErrorHandler(400, "error", "009e6c77");
      if (!/^\d\d-\d\d-\d\d\d\d$/.test(fecha)) throw new ResponseErrorHandler(400, "error", "b3afe692");
      if (!/^\d\d:\d\d:\d\d$/.test(hora)) throw new ResponseErrorHandler(400, "error", "11092604");

   });

   return input
}

