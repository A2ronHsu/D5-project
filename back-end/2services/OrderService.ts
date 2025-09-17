import Repository from "../3repositories/Repository";
import { OrderJson } from "../5models/OrderModels";


class OrderService {

   constructor(private repository: Repository) {

   }

   addNotas(jsonInput: OrderJson[]) {
      jsonInput.forEach(order => {
         const dateTime = new Date(`${order.fecha}T${order.hora}`);
         order.dateTime = dateTime
         const response = this.repository.addNotas(order);

      });
   }
}

export default OrderService;