import React from "react";

const Nav : React.FC = ()=>{
   return(
      <nav>
         <a href="index.html" className="link_button">Buscar por Codigo</a>
         <a href="ingresar_posicion.html" className="link_button">Ingresar Posicion</a>
      </nav>
   )
}

export default Nav;