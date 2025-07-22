import { Request, Response } from "express";
import AuthRegisterService from "../2services/AuthRegisterService"

export default class AuthRegisterController {
   constructor( private AuthRegisterService : AuthRegisterService ){
      
   }

   register( req: Request, res: Response){
      // const {}
   }

}