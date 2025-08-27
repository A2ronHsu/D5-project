import React from 'react';
import Nav from './1-Nav';
import Form from './2-Form';
import { Link } from 'react-router-dom';
import "./0-BuscarCodigo.css"

const BuscarCodigo: React.FC = ()=> {
 return (
  <div id="wrapper">
    <Nav></Nav>
    <Form></Form>
    <Link to="/dannyhome/transfer" className='link_button'>Testes</Link>
    <Link to="/dannyhome/devoluciones" className='link_button'>Devoluciones</Link>
    <Link to="/dannyhome/estragados" className='link_button'>Estragados</Link>


  </div>
 )
}

export default BuscarCodigo;
