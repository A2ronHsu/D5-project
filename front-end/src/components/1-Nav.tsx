import React from "react";
import { Link } from "react-router-dom";
import HelperStyles from "./-1-HelperStyles.modules.css";
import NavStyles from "./1-Nav.modules.css";

const Nav: React.FC = () => {
   return (
         <nav className={NavStyles.nav}>
            <Link to="/" className={HelperStyles.link}>Buscar Codigo</Link>
            <Link to="/ingresar_codigo" className={HelperStyles.link}>Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className={HelperStyles.link}>Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className={HelperStyles.link}>Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className={HelperStyles.link}>Ingresar Posicion</Link>
            <Link to="/ingresar_codigo" className={HelperStyles.link}>Ingresar Posicion</Link>
         </nav>
   )
}

export default Nav;