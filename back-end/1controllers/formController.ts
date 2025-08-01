import { Request, Response } from "express";
import { entradaPosicionesValidation, getCodigoValidation } from "../4schemas/FormSchemas";
import FormService from "../2services/formService";
import ResponseErrorHandler from "../4schemas/requestErrorHandler";


class FormController {

   constructor(private formService: FormService) {
   }

   async submit(req: Request, res: Response) {
      try {
         console.log(req.body)
         const validInput = entradaPosicionesValidation(req.body);
         const response = await this.formService.submit(validInput);
         res.json(response);
      } catch (err: unknown) {
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

   async getCodigo(req: Request, res: Response) {
      try {
         const validInput = getCodigoValidation(req.body);
         const response = await this.formService.getCodigo(validInput.codigo, validInput.dep);
         res.json(response);

      } catch (err: unknown) {
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

   async getAllCodigos(req: Request, res: Response) {
      try {
         const {dep} = req.params;
         
         const response = await this.formService.getAllCodigos(dep);
         res.json({ allCodigos: response });


      } catch (err: unknown) {
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

   async getRow(req: Request, res: Response) {
      try {
         const { codigo, dep } = req.body;
         const response = await this.formService.getRow(codigo, dep);
         res.json({ row: response });

      } catch (err: unknown) {
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

export default FormController;