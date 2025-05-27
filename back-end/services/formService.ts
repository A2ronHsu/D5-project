import { entradaPosiciones } from "../models/formModel";
import GoogleRepository from "../repositories/googlesheetRepository";

class FormService {

   constructor(private repository: GoogleRepository) {
   }




   async submit(input: entradaPosiciones) {
      const { codigo, pasillo, bloco, secuencia } = input;
      const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""]);
      return data;
   }

   async getCodigo(codigo: string) {
      const codigoColumns = this.repository.filterCodigoIndex("ZP3035C");
      return codigoColumns;
   }

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