import React, { useEffect, useMemo, useState, type ChangeEvent } from "react";
import SearchResultTable from "./3-SearchResultTable";
import { DepOptions } from "./-1-DepOptions";
import styles from "./2-Form.module.css"


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


   }, [dep])
   

   useEffect(()=>{
      console.log(allCodigos);

   },[allCodigos]);

   const handleDepChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
      setError(null)
   }

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      try {
         const res = await fetch("/getRow", {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({ codigo: searchInput, dep: dep })
         });

         if (!res.ok) throw new Error();

         const json = await res.json();
         setRow(json.row);

      } catch (error: any) {
         setError(`codigo no existe o no encontrado`);
      }

   }


   const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
      setSearhInput(event.target.value)
      setError(null);
   }

      const filteredOptions = useMemo(() => {
         if (searchInput === '') return [];
         return allCodigos.filter(element => element.toUpperCase().includes(searchInput.toUpperCase())).slice(0, 7);
      }, [searchInput,allCodigos]);




   if (loading) {
      return (
         <h1>Cargando...</h1>
      )
   }


   return (
      <>
         <form className={styles.searchCodigoWrapper} onSubmit={handleSubmit} >
               <h3 className={styles.depTitle}>Buscar en</h3>
               <select name="dep" className={styles.dep} value={dep} onChange={handleDepChange}>
                  <DepOptions/>




               </select>
               <input type="search" className={styles.codigo} name="codigo" list="listCodigo" value={searchInput} onChange={handleSearchInput} required></input>
               <datalist id="listCodigo">
                  {
                     filteredOptions.length > 0 ? (
                        filteredOptions.map((element, i) => {
                           return <option key={`${i}+${element}`} value={element}>{element}</option>
                        })
                     )
                        :
                        (
                           <option ></option>
                        )
                  }
               </datalist>
               <button type="submit" className={styles.submit}>Buscar</button>
         </form>
         {error && (<h3>{error}</h3>)}

         <SearchResultTable searchInput={searchInput} row={row}></SearchResultTable>
      </>
   )
}

export default Form;