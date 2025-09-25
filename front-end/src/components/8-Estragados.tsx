import type React from "react";
import Nav from "./1-Nav";
import EstragadosForm from "./8a-EstragadosForm";


const Estragados : React.FC = () =>{
   return <div className="general-wrapper">
      <Nav></Nav>
      <EstragadosForm></EstragadosForm>
   </div>
}

export default Estragados;