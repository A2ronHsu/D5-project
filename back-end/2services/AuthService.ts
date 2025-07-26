import AuthRepository from "../3repositories/AuthRepository"
import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { IUser, IUserLogin, IUserRegistration } from "../5models/AuthModels"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export default class AuthService {

   constructor(private authRepository: AuthRepository) {

   }
   async register(userRegistration: IUserRegistration): Promise<string> {
      const emailExist: boolean = !!this.authRepository.getUserByEmail(userRegistration.email);
      if (emailExist) throw new ResponseErrorHandler(409, "Email already registered")
      else {
         const hashedPassword = await bcrypt.hash(userRegistration.password, 10);
         userRegistration.password = hashedPassword;
         return await this.authRepository.register(userRegistration);
      };
   }

   async login(userLogin: IUserLogin) {
      const user = this.authRepository.getUserByEmail(userLogin.email);
      if (!user) throw new ResponseErrorHandler(401, "credential error");

      const isPasswordValid: boolean = await bcrypt.compare(userLogin.password, user.password);
      if (!isPasswordValid) throw new ResponseErrorHandler(401, "credential error");
      const secret = process.env.JWT_SECRET!;
      const loginToken = jwt.sign(
         { id: user.id, role: user.role },
         secret,
         { expiresIn: "5m" }
      )

      


      return {loginToken, userName: user.userName }
   }

}