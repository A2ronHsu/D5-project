import { entradaPosiciones } from "../models/formModel";
import GoogleRepository from "../repositories/googlesheetRepository";

class FormService {

   constructor(private repository: GoogleRepository) {
   }




   async submit(input: entradaPosiciones) {
      const { codigo, pasillo, bloco, secuencia, dep } = input;
      const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""], dep); //this two empty cells are required for furture usage on the main sheet.
      return data;
   }

   async getCodigo(codigo: string, dep:string): Promise<number> {
      const codigoRowNumber = await this.repository.findCodigoIndex(codigo, dep);
      return codigoRowNumber;
   };

   async getAllCodigos(dep:string): Promise<string[]> {
      const allCodigos = await this.repository.getAllCodigos(dep);
      return allCodigos;
   }

   async getRow(codigo: string, dep: string): Promise<string[]> {
      const row = await this.repository.getRow(codigo, dep);
      return row;

   }
}

export default FormService;