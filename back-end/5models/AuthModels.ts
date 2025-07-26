export interface IUser {
   id: string,
   userName: string,
   email:string,
   password: string,
   role:'user'|'admin' | 'depositero'
}

/**
 * Interface that represent the shape of a User registration
 * 
 */
export interface IUserRegistration {
   username: string,
   email: string,
   password:string
}

export interface IUserLogin {
   email: string,
   password: string
}