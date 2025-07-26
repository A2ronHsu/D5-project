import { Request, Response } from "express";
import { validadeUserRegistration, validadeUserLogin } from "../4schemas/AuthSchemas";
import { IUserLogin, IUserRegistration } from "../5models/AuthModels";

import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import AuthService from "../2services/AuthService";


export default class AuthController {
   constructor(private authService: AuthService) {

   }

   async register(req: Request, res: Response) {
      try {
         const userRegistration: IUserRegistration = validadeUserRegistration(req.body);
         const response = await this.authService.register(userRegistration);
         res.status(200);
         res.json(response);
      } catch (err) {
         if (err instanceof ResponseErrorHandler) {
            res.status(err.statusCode).json({
               name: err.name,
               message: err.message
            });
         } else {
            res.json({ error: "unknown error" });

         }
      }



   }


   async login(req: Request, res: Response) {
      try {
         const userLogin: IUserLogin = validadeUserLogin(req.body);
         const response = await this.authService.login(userLogin);
         res.status(200).cookie("login",response.loginToken,{
            httpOnly:true,
            maxAge: 18000000, // 5h expiration in miliseconds,
            sameSite: "lax", //Protects againd CSRF,
            path: '/', // Accessible across the whole domain.
         })
         .json({
            message: "logged in",
            userName:response.userName
         });

      } catch (err) {
         if (err instanceof ResponseErrorHandler) {
            res.status(400).json({
               name: err.name,
               message: err.message
            })
         }
         else {
            res.status(400).json({
               error: "unknow error on login"
            })
         }
      }
   }
}
