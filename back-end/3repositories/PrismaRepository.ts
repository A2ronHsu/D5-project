import { Order } from "../5models/OrderModels";
import { PrismaClient } from "./../generated/prisma/client";

class PrismaRepository {
   constructor(private prisma: PrismaClient) {

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