import React from "react"
import Nav from "./1-Nav";
import IngresarForm from "./4a-IngresarForm";

const IngresarCodigo: React.FC = () => {
   return (
      <div className="general-wrapper">
         <Nav></Nav>
         <IngresarForm></IngresarForm>
      </div>
   )
}

export default IngresarCodigo;