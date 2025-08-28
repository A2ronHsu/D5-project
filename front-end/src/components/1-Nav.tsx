import React from "react";
import { Link } from "react-router-dom";
import "./1-Nav.css";
import "./-1-HelperStyles.css"

const Nav: React.FC = () => {
   return (
         <nav >
            <Link to="/" className="link-button">Buscar Codigo</Link>
            <Link to="/ingresar_codigo" className="link-button">Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className="link-button">Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className="link-button">Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className="link-button">Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className="link-button">Ingresar Posicion</Link>
         </nav>
   )
}

export default Nav;