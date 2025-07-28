export type Roles = 'user'|'admin' | 'depositero';
export const roles : Array<Roles>= ["user", "admin", "depositero"];


export interface IUser {
   id: string,
   userName: string,
   email:string,
   password: string,
   role: Roles
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

export interface jwtToken {
   id: string,
   role: string,
}