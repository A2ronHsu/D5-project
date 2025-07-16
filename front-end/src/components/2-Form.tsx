import React, { useEffect, useState, type ChangeEvent } from "react";
import SearchResultTable from "./3-SearchResultTable";

const Form: React.FC = () => {



   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const [dep, setDep] = useState<string>("D5");

   const [searchInput, setSearhInput] = useState<string>("")
   const [row, setRow] = useState<string[]>([]);

   useEffect(() => {
      const populateList = async (dep: string) => {
         try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/getAllCodigos/${dep}`);
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`)
            }
            const resJson = await res.json();
            const newAllCodigos: string[] = resJson.allCodigos;

            setAllCodigos(newAllCodigos);
            return newAllCodigos;

         } catch (err: any) {
            setError(err.message)
            setAllCodigos([]);
         } finally {
            setLoading(false);
         }

      }

      populateList(dep);
      setSearhInput("");
      setRow([]);
      setError(null);
      
   }, [dep])


   const handleDepChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
      setError(null)
   }

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      try{
         const res = await fetch("/getRow", {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({ codigo: searchInput, dep: dep })
         });

         if(!res.ok) throw new Error();
   
         const json = await res.json();
         setRow(json.row);
         
      }catch(error:any){
         setError(`codigo no existe o no encontrado`);
      }

   }


   const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
      setSearhInput(event.target.value)
      setError(null);
   }



   if (loading) {
      return (
         <h1>Cargando...</h1>
      )
   }



   return (
      <>
         <form id="search_codigo" onSubmit={handleSubmit} >
            <div id="dep-selection-container">
               <h3 id="dep-title">Buscar en</h3>
               <select name="dep" id="dep" value={dep} onChange={handleDepChange}>
                  <option className="dep-options" value="D5">D5</option>
                  <option className="dep-options" value="D8">D8</option>
               </select>
            </div>
            <div id="search-container">
               <input type="search" id="codigo" name="codigo" list="listCodigo" value={searchInput} onChange={handleSearchInput} required></input>
               <datalist id="listCodigo">
                  {allCodigos.map((option, key) => (
                     <option value={option} key={key}>{option}</option>
                  ))}
               </datalist>
               <button type="submit" id="submit">Buscar</button>
            </div>
         </form>
         {error && (<h3>{error}</h3>)}

         <SearchResultTable searchInput={searchInput} row={row}></SearchResultTable>
      </>
   )
}

export default Form;