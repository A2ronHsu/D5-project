export interface IUserRegistration {
   id: string,
   userName: string,
   email:string,
   password: string,
   role:'user'|'admin'
}