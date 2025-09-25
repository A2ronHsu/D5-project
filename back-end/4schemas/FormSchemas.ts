import { Response } from "express";
import { entradaPosiciones, ICustomError, IEstragado } from "../5models/formModel";
import ResponseErrorHandler from "./requestErrorHandler";



export const entradaPosicionesValidation = (input: any) => {
   const { codigo, pasillo, bloco, secuencia, dep } = input;
   if (!codigo || !pasillo || !bloco || !secuencia || !dep) {
      let error = new ResponseErrorHandler(400, "Input Error","invalid Input");
      throw error
   };
   return { codigo, pasillo, bloco, secuencia, dep };

}

export const entradaPosicionesRecebimientosValidation = (input: any) => {
   const { codigo, packingList, unidadPosicion } = input;
   if (!codigo || !packingList || !unidadPosicion) {
      let error = new ResponseErrorHandler(400, "Input Error","invalid Input");
      throw error
   };
   return { codigo, packingList, unidadPosicion };

}

export const getCodigoValidation = (input: any) => {
   const { codigo, dep } = input;
   if (!codigo || !dep) {
      let error = new ResponseErrorHandler(400, "Input Error","Invalid Input");
      throw error
   };
   return {codigo, dep};
}

export const transferValidation = (input:any) =>{
   let {fecha, dep, codigo, bloco, cantidad} = input;
   if( !fecha || !dep || !codigo || !bloco || !cantidad){
      let error = new ResponseErrorHandler(400, "Input Error", "Invalid Input");
      throw error;
   };

   bloco = Number(bloco);
   cantidad = Number(cantidad);

   return {fecha, dep, codigo, bloco, cantidad};

}

export const estragadoValidation = (input:any): IEstragado =>{
   let { codigo, dep, descripcion, cantidad} = input;
   if( !codigo || !dep || !cantidad || !descripcion){
      let error = new ResponseErrorHandler(400, "Input Error", "Invalid Input");
      throw error;
   };

   cantidad = Number(cantidad);

   if(isNaN(cantidad) || cantidad <= 0){
      let error = new ResponseErrorHandler(400, "Input Error", "Invalid Input: 'cantidad' must be a positive number");
      throw error;
   }

   return {codigo, dep, descripcion, cantidad};
}
