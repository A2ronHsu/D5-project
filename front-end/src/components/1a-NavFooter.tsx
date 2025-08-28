import React from "react";
import { Link } from "react-router-dom";
import "./1-Nav.css";
import "./-1-HelperStyles.css"

const NavFooter: React.FC = () => {
   return (
      <nav >
         <Link to="/dannyhome/transfer" className="link-button">Testes</Link>
         <Link to="/dannyhome/devoluciones" className="link-button">Devoluciones</Link>
         <Link to="/dannyhome/estragados" className="link-button">Estragados</Link>
      </nav>
   )
}

export default NavFooter;