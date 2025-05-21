import { entradaPosiciones } from "../models/formModel";

export const entradaPosicionesValidation = (input: any) => {
   const { codigo, pasillo, bloco, secuencia } = input;
   if (!codigo || !pasillo || !bloco || !secuencia) throw new Error("invalid input");
   return { codigo, pasillo, bloco, secuencia };

}

export const getCodigoValidation = (input: any) => {
   const { codigo } = input;
   if (!codigo) throw new Error("invalid input");
   return codigo;
}