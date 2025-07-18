import React from "react";
import { Link } from "react-router-dom";
const Nav : React.FC = ()=>{
   return(
      <nav>
         <Link to="/" className="link_button">Buscar por Codigo</Link>
         <Link to="/ingresar_codigo" className="link_button">Ingresar Posicion</Link>
      </nav>
   )
}

export default Nav;