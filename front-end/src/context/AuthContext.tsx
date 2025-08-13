import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../api/axios.Config";
import { useNavigate } from "react-router-dom";
import IUser from "../../../back-end/5models/AuthModels"

interface AuthContextType {
   user: IUser | null,
   isAuthenticated: boolean,
   isLoading: boolean,
   login: (userData: IUser) => void,
   logout: () => void
}

//Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//Custom hook to use the AuthContext
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuth must e used within an AuthProvider');
   }
   return context;
}

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const [user, setUser] = useState<IUser | null>(null);
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<boolean>(false); // To handle initial load/check
   const navigate = useNavigate(); //for programatic navigation

   //Function to check authentication status on app load
   //With HttpOnly cookies, we rely on a backen endpout to tell us if we're logged in
   useEffect(() => {
      const  checkAuthStatus = async () => {
         try {
            //Here we need the backend endpoint that returns user info if authenticated (cookie present and valid), or 401 if not.
            const response = await api.get('/auth/status'); //Create this endpoint
         } catch (error) {

         }
      }

   })


   return <></>
}