import { entradaPosiciones, IEstragado, ITransfer, posicionRecebimiento } from "../5models/formModel";
import GoogleRepository from "../3repositories/googlesheetRepository";

class FormService {

   constructor(private repository: GoogleRepository) {
   }




   async submit(input: entradaPosiciones) {

      const { codigo, pasillo, bloco, secuencia, dep } = input;
      const data = await this.repository.appendPosicion(codigo, [pasillo, bloco, secuencia, "", ""], dep); //this two empty cells are required for furture usage on the main sheet.
      return data;
   }

   async postPosicionRecebimiento(input: posicionRecebimiento) {
      const { codigo, packingList, unidadPosicion } = input;
      const data = await this.repository.appendPosicionRecebimiento(codigo, packingList, unidadPosicion);
      return data;
   }

   async getCodigo(codigo: string, dep: string): Promise<number> {
      const codigoRowNumber = await this.repository.findCodigoIndex(codigo, dep);
      return codigoRowNumber;
   };

   async getAllCodigos(dep: string): Promise<string[]> {

      const allCodigos = await this.repository.getAllCodigos(dep);

      return allCodigos;
   }

   async getLastPosicionRecebimientos(packingList: string): Promise<number> {
      return await this.repository.getLastPosicionRecebimientos(packingList);
   }

   async getRow(codigo: string, dep: string): Promise<string[]> {
      const row = await this.repository.getRow(codigo, dep);
      return row;

   }

   async getRowRecebimientos(codigo: string, packingList: string): Promise<string[]> {
      const row = await this.repository.getRowRecebimientos(codigo, packingList);
      return row;
   }

   async appendEstragado(data: IEstragado): Promise<any> {
      const { codigo, dep, descripcion,cantidad } = data;
      
      await this.repository.findCodigoIndex(codigo, "EstragadoDH"); // to check if the codigo exists, if not it will throw an error
      const response = await this.repository.appendRecord([codigo, descripcion, cantidad], dep);
      return response;
   }


   async transfer(input: ITransfer) {
      const { fecha, dep, codigo, bloco, cantidad } = input;
      const response = await this.repository.transfer([fecha, dep, codigo, bloco, cantidad]);
      return response;
   }
}

export default FormService;