import AuthRepository from "../3repositories/AuthRepository"
import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { IUser, IUserRegistration } from "../5models/AuthModels"

export default class AuthService{
   
   constructor(private authRepository:AuthRepository){

   }
   async register(userRegistration:IUserRegistration):Promise<string>{
      const emailExist: boolean = !!this.authRepository.getUserByEmail(userRegistration.email);
      if(emailExist) throw new ResponseErrorHandler(409, "Email already registered")
      else return await this.authRepository.register(userRegistration);
   }
   
}