import { Request, Response } from "express";
import GoogleRepository from "../repositories/googlesheetRepository";
import { entradaPosicionesValidation, getCodigoValidation } from "../schemas/FormSchemas";
import FormService from "../services/formService";


class FormController {

   constructor(private formService: FormService) {
   }

   async submit(req: Request, res: Response) {
      const validIput = entradaPosicionesValidation(req.body);
      const response = await this.formService.submit(validIput);
      res.json(response);
   }

   async getCodigo(req:Request, res:Response){
      const validInput =  getCodigoValidation(req.body);
      const response = await this.formService.getCodigo(validInput);
      res.json(response);
   }
}

export default FormController;