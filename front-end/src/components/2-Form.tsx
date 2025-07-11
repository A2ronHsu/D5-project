import React, { useEffect, useState, type ChangeEvent } from "react";

const Form: React.FC = ()=>{
   const [dep, setDep] = useState("D5");

   
   
   const handleDepChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
   }

   const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
   }

   

   useEffect(()=>{

   },[])

   return(
      <form id="search_codigo" onSubmit={handleSubmit} >
         <div id="dep-selection-container">
            <h3 id="dep-title">Buscar en</h3>
            <select name="dep" id="dep" value={dep} onChange={handleDepChange}>
               <option className="dep-options" value="D5">D5</option>
               <option className="dep-options" value="D8">D8</option>
            </select>
         </div>
         <div id="search-container">
            <input type="search" id="codigo" name="codigo" list="listCodigo" required></input>
            <datalist id="listCodigo"></datalist>
            <button type="submit" id="submit">Buscar</button>
         </div>
      </form>
   )
}

export default Form;