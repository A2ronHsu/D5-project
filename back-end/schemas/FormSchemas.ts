import { Response } from "express";
import { entradaPosiciones, ICustomError } from "../models/formModel";
import ResponseErrorHandler from "./requestErrorHandler";



export const entradaPosicionesValidation = (input: any) => {
   const { codigo, pasillo, bloco, secuencia } = input;
   if (!codigo || !pasillo || !bloco || !secuencia) {
      let error = new ResponseErrorHandler(400, "invalid Input",);
      error.name = "Input Error";
      throw error
   };
   return { codigo, pasillo, bloco, secuencia };

}

export const getCodigoValidation = (input: any) : string=> {
   const { codigo } = input;
   if (!codigo) {
      let error = new ResponseErrorHandler(400, "Invalid Input");
      error.name = "Input Error"
      throw error
   };
   return codigo;
}

