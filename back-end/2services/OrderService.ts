import PrismaRepository from "../3repositories/PrismaRepository";
import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { Order, OrderJson } from "../5models/OrderModels";


class OrderService {

   constructor(private repository: PrismaRepository) {

   }

   async addNotas(jsonInput: OrderJson[]) {
      try {
         const insertionResult = [];

         for (const orderJson of jsonInput) {
            const date = orderJson.fecha.split('-').reverse().join('-');
            const dateTime = new Date(`${date}T${orderJson.hora}`);
            const inputOrder: Order = {
               nota: Number(orderJson.nota.slice(6)),
               comentario: orderJson.comentario,
               codigoCliente: orderJson.codigoCliente,
               nombreCliente: orderJson.nombreCliente,
               printStatus: Boolean(orderJson.printStatus),
               deposito: orderJson.deposito,
               codigoVendedor: orderJson.codigoVendedor,
               nombreVendedor: orderJson.nombreVendedor,
               dateTime: dateTime,
            };
            const lastOrder = await this.repository.getLastRepeatedOrderNota(inputOrder.nota);
            if (lastOrder){
               const isOrderEqual = await this.repository.isOrderEqual(inputOrder, lastOrder)
               if (isOrderEqual){
                  console.log(`Order ${inputOrder.nota} already exist`);
               }else{
                  console.log('result : '+isOrderEqual, inputOrder, lastOrder );
                  await this.repository.addOrder(inputOrder);
                  console.log(`Inserted new order with repeated nota: ${inputOrder.nota}`)
                  insertionResult.push(inputOrder);
               }
            }else{
               await this.repository.addOrder(inputOrder);
               console.log(`Inserted new unique order: ${inputOrder.nota}`);
               insertionResult.push(inputOrder.nota);
            }
         }

         return {message:'Insertion complete', insertedOrders: insertionResult}
      }catch(error: any){
         console.error(error);
         throw new ResponseErrorHandler(500, 'Insertion error f0feb32c', error.message)
      }
      

   }
}

export default OrderService;