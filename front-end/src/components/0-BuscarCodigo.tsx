import React from 'react';
import Nav from './1-Nav';
import Form from './2-Form';
import NavFooter from './1a-NavFooter';
const BuscarCodigo: React.FC = ()=> {
 return (
  <div id="general-wrapper">
    <Nav></Nav>
    <Form></Form>
    <NavFooter></NavFooter>
  </div>
 )
}

export default BuscarCodigo;
