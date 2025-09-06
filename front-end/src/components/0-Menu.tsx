import React from 'react';
import { Link } from 'react-router-dom';
import Helper from "./-1-HelperStyles.module.css"
import styles from "./0-Menu.module.css"
const Menu: React.FC = () => {
  return (
    <div className="general-wrapper">
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Menu Principal</legend>
        <Link to="/posicion" className={Helper.link}>Posicion</Link>
        <Link to="/transfer" className={Helper.link}>test1</Link>
        <Link to="/transfer" className={Helper.link}>test2</Link>
        <Link to="/transfer" className={Helper.link}>test3</Link>



      </fieldset>
    </div>
  )
}

export default Menu;
