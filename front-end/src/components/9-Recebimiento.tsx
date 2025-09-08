import React from "react";
import Nav from "./1-Nav";
import RecebimientoSearchForm from "./9a-RecebimientoSearchForm";
// import RecebimientoInputForm from "./9c-RecebimientoInputForm";

const Recebimiento: React.FC = () => {
   return <div className="general-wrapper">
      <Nav></Nav>
      <RecebimientoSearchForm></RecebimientoSearchForm>
      {/* <RecebimientoInputForm></RecebimientoInputForm> */}

   </div>
}

export default Recebimiento;