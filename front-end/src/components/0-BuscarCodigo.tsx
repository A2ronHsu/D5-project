import React from 'react';
import Nav from './1-Nav';
import Form from './2-Form';
import { Link } from 'react-router-dom';

const BuscarCodigo: React.FC = ()=> {
 return (
  <>
    <Nav></Nav>
    <Form></Form>
    <Link to="/dannyhome/transfer" className='link_button'>DannyHome</Link>
  </>
 )
}

export default BuscarCodigo;
