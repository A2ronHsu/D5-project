export interface OrderJson {
   nota: string,
   comentario: string,
   codigoCliente: string,
   nombreCliente: string,
   fecha: string,
   hora: string,
   printStatus: string,
   deposito: string,
   codigoVendedor: string,
   nombreVendedor: string
}

export interface Order {
   nota: number,
   comentario: string,
   codigoCliente: string,
   nombreCliente: string,
   dateTime: Date,
   printStatus: boolean,
   deposito: string,
   codigoVendedor: string,
   nombreVendedor: string
}