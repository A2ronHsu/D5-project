import React from "react";
import { Link } from "react-router-dom";
import style from "./1-Nav.module.css";
import Helper from "./-1-HelperStyles.module.css";

const Nav: React.FC = () => {
   return (
         <nav className={style.mainNav}>
            <Link to="/" className={Helper.link}>Inicio</Link>
         </nav>
   )
}

export default Nav;