export default class ResponseErrorHandler extends Error {
   statusCode: number;
   constructor(statusCode:number, name:string, message?: string,  options?: ErrorOptions) {
      super(message,options);
      this.statusCode = statusCode|200;
      this.name = name;
   }
}