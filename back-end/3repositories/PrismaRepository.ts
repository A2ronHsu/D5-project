import { OrderJson } from "../5models/OrderModels";
import { PrismaClient } from "@prisma/client";

class PrismaRepository {
   constructor( private prisma:PrismaClient){
      
   }

   async addNotas(notas : OrderJson){

   }
}

export default PrismaRepository