import OrderService from "../2services/OrderService";
import { Request, Response } from "express";
import { OrderJsonValidation } from "../4schemas/OrderSchema";
import ResponseErrorHandler from "../4schemas/requestErrorHandler";

class OrderController {

   constructor(private orderService: OrderService) {

   }

   async addNotas(req: Request, res: Response) {
      try {
         const validInput = OrderJsonValidation(req.body);
         const response = await this.orderService.addNotas(validInput);
         console.log(response);

         res.json(response);

      } catch (err) {
         if (err instanceof ResponseErrorHandler) {
            res.status(err.statusCode).json({
               name: err.name,
               message: err.message
            });
         } else {
            res.json({ error: `unknown error: ${err}` });

         }
      }

   }


}

export default OrderController;