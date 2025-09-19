import { Order } from "../5models/OrderModels";
import { PrismaClient } from "./../generated/prisma/client";

class PrismaRepository {
   constructor(private prisma: PrismaClient) {

   }

   async isNotaRepeated(nota: number) : Promise<boolean> {
      const count = await this.prisma.orders.count({
         where: {
            nota: nota
         }
      })

      return count > 0
   }

   async getLastRepeatedNota(nota: number) {
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
      return (
         inputOrder.nota == databaseOrder.nota &&
         inputOrder.comentario == databaseOrder.comentario &&
         inputOrder.codigoCliente == databaseOrder.codigoCliente &&
         inputOrder.nombreCliente == databaseOrder.nombreCliente &&
         inputOrder.dateTime == databaseOrder.dateTime &&
         inputOrder.printStatus == databaseOrder.printStatus &&
         inputOrder.deposito == databaseOrder.deposito &&
         inputOrder.codigoVendedor == databaseOrder.codigoVendedor &&
         inputOrder.nombreVendedor == databaseOrder.nombreVendedor
      )
   }



   async addOrder(order: Order) {
      await this.prisma.orders.create({
         data: {
            ...order
         }
      })

      console.log(order);

   }
}

export default PrismaRepository