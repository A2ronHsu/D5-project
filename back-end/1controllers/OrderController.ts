import OrderService from "../2services/OrderService";
import { Request, Response } from "express";
import { OrderJsonValidation } from "../4schemas/OrderSchema";
import ResponseErrorHandler from "../4schemas/requestErrorHandler";

class OrderController {

   constructor(private orderService: OrderService) {

   }

   addNotas(req: Request, res: Response) {
      try {
         const validInput = OrderJsonValidation(req.body);
         console.log(validInput);

         const response = this.orderService.addNotas(validInput);

         res.json(validInput);

      } catch (err) {
         if (err instanceof ResponseErrorHandler) {
            res.status(err.statusCode).json({
               name: err.name,
               message: err.message
            });
         } else {
            res.json({ error: "unknown error" });

         }
      }

   }


}

export default OrderController;