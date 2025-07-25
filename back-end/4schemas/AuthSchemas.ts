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
   const {username, password} = reqBody;
   if(!username || !password) {
      throw new ResponseErrorHandler(400,"bad input")
   }
   return {username, password}

}