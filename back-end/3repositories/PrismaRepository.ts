import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { Order } from "../5models/OrderModels";
import { PrismaClient } from "@prisma/client";


class PrismaRepository {
   constructor(private prisma: PrismaClient) {

   }



   async getLastRepeatedOrderNota(nota: number): Promise<Order | null> {
      const lastNota = await this.prisma.orders.findFirst({
         where: {
            nota: nota
         },
         orderBy: {
            createdAt: "desc"
         }
      })

      return lastNota;
   }

   async isOrderEqual(inputOrder: Order, databaseOrder: Order) {
      const nota = inputOrder.nota == databaseOrder.nota;
      const comentario = inputOrder.comentario == databaseOrder.comentario;
      const codigoCliente = inputOrder.codigoCliente == databaseOrder.codigoCliente;
      const nombreCliente = inputOrder.nombreCliente == databaseOrder.nombreCliente;
      const dateTime = inputOrder.dateTime.toString() == databaseOrder.dateTime.toString();
      const printStatus = inputOrder.printStatus == databaseOrder.printStatus;
      const deposito = inputOrder.deposito == databaseOrder.deposito;
      const codigoVendedor = inputOrder.codigoVendedor == databaseOrder.codigoVendedor;
      const nombreVendedor = inputOrder.nombreVendedor == databaseOrder.nombreVendedor;

      // if (!nota) console.log('nota '+nota)
      // if (!comentario) console.log('comentario '+comentario)
      // if (!codigoCliente) console.log('codigoCliente '+codigoCliente)
      // if (!nombreCliente) console.log('nombreCliente '+nombreCliente)
      // if (!dateTime) console.log('dateTime '+dateTime)
      // if (!printStatus) console.log('printStatus '+printStatus)
      // if (!deposito) console.log('deposito '+deposito)
      // if (!codigoVendedor) console.log('codigoVendedor '+codigoVendedor)
      // if (!nombreVendedor) console.log('nombreVendedor '+nombreVendedor)


      return (
         nota &&
         comentario &&
         codigoCliente &&
         nombreCliente &&
         dateTime &&
         printStatus &&
         deposito &&
         codigoVendedor &&
         nombreVendedor
      )
   }

   async addOrder(order: Order) {
      const result = await this.prisma.orders.create({
         data: {
            ...order
         }
      })

      return result
   }
}

export default PrismaRepository