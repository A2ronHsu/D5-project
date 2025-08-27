import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"


const PrivateRoute: React.FC = () =>{
   const {isAuthenticated, isLoading} = useAuth();
   
   if(isLoading){
      return <div>Loading...</div>
   }

   return isAuthenticated? <Outlet/> : <Navigate to="/dannyhome/login" replace/>

}

export default PrivateRoute;