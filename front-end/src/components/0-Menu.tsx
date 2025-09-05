import React from 'react';
import { Link } from 'react-router-dom';
import Helper from "./-1-HelperStyles.module.css"
const Menu: React.FC = ()=> {
 return (
  <div className="general-wrapper">
    <Link to="/posicion" className={Helper.link}>Posicion</Link>
    <Link to="/transfer" className={Helper.link}>test</Link>
  </div>
 )
}

export default Menu;
