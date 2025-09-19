import PrismaRepository from "../3repositories/PrismaRepository";
import { Order, OrderJson } from "../5models/OrderModels";


class OrderService {

   constructor(private repository: PrismaRepository) {

   }

   addNotas(jsonInput: OrderJson[]) {
      jsonInput.forEach(orderJson => {
         const date = orderJson.fecha!.split('-').reverse().join('-');
         const dateTime = new Date(`${date}T${orderJson.hora}`);
         const inputOrder: Order = {
            nota: BigInt(orderJson.nota),
            comentario: orderJson.comentario,
            codigoCliente: orderJson.codigoCliente,
            nombreCliente: orderJson.nombreCliente,
            printStatus: Boolean(orderJson.printStatus),
            deposito: orderJson.deposito,
            codigoVendedor: orderJson.codigoVendedor,
            nombreVendedor: orderJson.nombreVendedor,
            dateTime: dateTime,
         }

         // if 

         // const response = this.repository.addOrder(order);

      });

      return { message: "ok" }
   }
}

export default OrderService;