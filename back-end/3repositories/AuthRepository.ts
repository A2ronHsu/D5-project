import ResponseErrorHandler from "../4schemas/requestErrorHandler";
import { IUser, IUserRegistration } from "../5models/AuthModels";
import bcrypt from 'bcrypt';



export default class AuthRepository {
   private Users: IUser[] = [
      {
         id: "123456789",
         userName: "depositero",
         email: "depositore@email.com",
         password: "$2b$10$kA1Fwfm6dllHGDilPcoHlu7nZS8Hr3ZHhwPdWncqrIw4dW3groZcm",
         role: 'depositero'
      }
   ]

   constructor() {
   }

   async register(userRegistration: IUserRegistration) {
      try {
         const hashedPassword = await bcrypt.hash(userRegistration.password, 10);
         
         const newUser: IUser = {
            id: "1111",
            userName: userRegistration.username,
            email: userRegistration.email,
            password: hashedPassword,
            role: "depositero"
         }



         this.Users.push(newUser);

         console.log(this.Users);

         return "User registered";

      } catch (err) {
         throw new ResponseErrorHandler(500, "register error");
      }


   }


   getUserByEmail(email: string) {
      return this.Users.find(user => email == user.email);
   }



}