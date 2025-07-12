import React, { useEffect, useState, type ChangeEvent } from "react";

const Form: React.FC = () => {
   const [dep, setDep] = useState<string>("D5");
   const [loadingList, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const [allCodigos, setAllCodigos] = useState<string[]>([]);


   const populateList = async () => {
      try {


         setLoading(true);
         setError(null);



         const res = await fetch(`/getAllCodigos/${dep}`);
         if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
         }
         const resJson = await res.json();
         const newAllCodigos: string[] = resJson.allCodigos;

         setAllCodigos((prevState)=>{
            console.log("updated function ",prevState)
            return newAllCodigos
         });
         return newAllCodigos;

      } catch (err: any) {
         setError(err.message)
         setAllCodigos([]);
      } finally {
         setLoading(false);
      }

      return []
   }


   useEffect(() => {
      populateList();

   }, [dep])


   useEffect(()=>{
      console.log("useEffect ",dep, allCodigos);
   })

   const handleDepChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
      populateList()
      console.log(dep, allCodigos);

   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      // event.preventDefault();
   }










   return (
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