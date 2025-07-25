import { Response } from "express";
import { entradaPosiciones, ICustomError } from "../5models/formModel";
import ResponseErrorHandler from "./requestErrorHandler";



export const entradaPosicionesValidation = (input: any) => {
   const { codigo, pasillo, bloco, secuencia, dep } = input;
   if (!codigo || !pasillo || !bloco || !secuencia || !dep) {
      let error = new ResponseErrorHandler(400, "Input Error","invalid Input");
      throw error
   };
   return { codigo, pasillo, bloco, secuencia, dep };

}

export const getCodigoValidation = (input: any) => {
   const { codigo, dep } = input;
   if (!codigo || !dep) {
      let error = new ResponseErrorHandler(400, "Input Error","Invalid Input");
      throw error
   };
   return {codigo, dep};
}

