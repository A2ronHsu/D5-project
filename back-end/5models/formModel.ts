export interface entradaPosiciones {
   codigo: string,
   pasillo: string,
   bloco: string,
   secuencia: string,
   dep:string
}

export interface posicionRecebimiento{
   codigo: string,
   packingList: string,
   unidadPosicion: number
}

export interface getRange {
   range: string,
}

export interface ICustomError extends Error {
   statusCode: number;
}

export interface ITransfer {
   fecha: string,
   dep: string,
   codigo: string,
   bloco: number,
   cantidad: number
}

export type ITransferRow = [string, string, string, number, number];