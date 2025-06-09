import { entradaPosiciones } from "../models/formModel";
import GoogleRepository from "../repositories/googlesheetRepository";

class FormService {

   constructor(private repository: GoogleRepository) {
   }




   async submit(input: entradaPosiciones) {
      const { codigo, pasillo, bloco, secuencia } = input;
      const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""]); //this two empty cells are required for furture usage on the main sheet.
      return data;
   }

   async getCodigo(codigo: string) : Promise<number> {
      const codigoRowNumber = await this.repository.findCodigoIndex("codigo");
      return codigoRowNumber;
   };

   async getAllCodigos(): Promise<string[]>{
      const allCodigos = await this.repository.getAllCodigos();
      return allCodigos;
   }

   async getRow(codigo:string):Promise<string[]>{
      const row = await this.repository.getRow(codigo);
      return row;

   }
}

export default FormService;