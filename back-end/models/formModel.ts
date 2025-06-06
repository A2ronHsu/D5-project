export interface entradaPosiciones {
   codigo: string,
   pasillo: string,
   bloco: string,
   secuencia: string
}

export interface getRange {
   range: string,
}

export interface ICustomError extends Error {
   statusCode: number;
}