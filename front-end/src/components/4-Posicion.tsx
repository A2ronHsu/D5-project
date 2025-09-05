import React from "react"
import Nav from "./1-Nav";
import PosicionForm from "./4a-PosicionForm.tsx";

const Posicion: React.FC = () => {
   return (
      <div className="general-wrapper">
         <Nav></Nav>
         <PosicionForm></PosicionForm>
      </div>
   )
}

export default Posicion;