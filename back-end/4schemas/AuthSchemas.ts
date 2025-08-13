import { IUserRegistration, IUserLogin } from "../5models/AuthModels"
import ResponseErrorHandler from "./requestErrorHandler";

export const validadeUserRegistration = (reqBody: any): IUserRegistration => {
   const { username, email, password } = reqBody;
   if (!username || !email || !password) {
      throw new ResponseErrorHandler(400, "bad Input", "bad request");
   }
   return { username, email, password };
}

export const validadeUserLogin = (reqBody: any): IUserLogin => {
   const {email, password} = reqBody;
   if(!email || !password) {
      throw new ResponseErrorHandler(400,"bad input")
   }
   return {email, password}

}

export const validadeAuthStatus = (cookie:any) =>{
   const {token} = cookie;
   if(!token) throw new ResponseErrorHandler(400,"auth error");
   return token;

}