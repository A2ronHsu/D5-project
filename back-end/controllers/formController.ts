import { Request, Response } from "express";
import { entradaPosicionesValidation, getCodigoValidation } from "../schemas/FormSchemas";
import FormService from "../services/formService";
import ResponseErrorHandler from "../schemas/requestErrorHandler";


class FormController {

   constructor(private formService: FormService) {
   }

   async submit(req: Request, res: Response) {
      try {
         const validIput = entradaPosicionesValidation(req.body);
         const response = await this.formService.submit(validIput);
         res.json(response);
      } catch (err: unknown) {
         if (err instanceof ResponseErrorHandler) {
            res.status(err.statusCode).json({
               name: err.name,
               message: err.message
            });
         } else {
            res.json({ erro: "unknown error" });

         }
      }
   }

   async getCodigo(req: Request, res: Response) {
      try {
         const validInput = getCodigoValidation(req.body);
         const response = await this.formService.getCodigo(validInput);
         res.json(response);

      } catch (error) {
         res.json(error);
      }
   }

   async getAllCodigos(req: Request, res: Response) {
      try {
         const response = await this.formService.getAllCodigos();
         res.json({ allCodigos: response });


      } catch (error) {
         res.json(error)
      }
   }

   async getRow(req: Request, res: Response) {
      try {
         const { codigo } = req.body;
         const response = await this.formService.getRow(codigo);
         res.json({ row: response });

      } catch (error) {
         res.json(error);
      }
   }
}

export default FormController;