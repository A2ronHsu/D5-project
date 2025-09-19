import PrismaRepository from "../3repositories/PrismaRepository";
import { OrderJson } from "../5models/OrderModels";


class OrderService {

   constructor(private repository: PrismaRepository) {

   }

   addNotas(jsonInput: OrderJson[]) {
      jsonInput.forEach(order => {
         const date = order.fecha.split('-').reverse().join('-');
         const dateTime = new Date(`${date}T${order.hora}`);
         order.dateTime = dateTime
         const response = this.repository.addNotas(order);

      });

      return {message: "ok"}
   }
}

export default OrderService;