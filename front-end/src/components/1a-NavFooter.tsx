import React from "react";
import { Link } from "react-router-dom";
import Helper from "./-1-HelperStyles.module.css";
const NavFooter: React.FC = () => {
   return (
      <nav >
         <Link to="/dannyhome/transfer" className={Helper.link}>Testes</Link>
         <Link to="/dannyhome/devoluciones" className={Helper.link}>Devoluciones</Link>
         <Link to="/dannyhome/estragados" className={Helper.link}>Estragados</Link>
      </nav>
   )
}

export default NavFooter;