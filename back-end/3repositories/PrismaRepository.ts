import { OrderJson } from "../5models/OrderModels";
import { PrismaClient } from "./../generated/prisma/client";

class PrismaRepository {
   constructor( private prisma:PrismaClient){
      
   }

   async addNotas(notas : OrderJson){
      
      console.log(notas);
   }
}

export default PrismaRepository