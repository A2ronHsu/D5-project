import React, { useEffect, useMemo, useState } from "react";
import EstragadosOptions from "./-1-EstragadosOptions";
import styles from "./4a-PosicionForm.module.css";
import EstragadoResultTable from "./8b-EstragadoResultTable";

const EstragadosForm: React.FC = () => {
   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [response, setResponse] = useState<string>("");

   const [dep, setDep] = useState<string>("EstragadoDHD4");
   const [searchInput, setSearhInput] = useState<string>("");
   const [estragadoRow, setEstragadoRow] = useState<string[]>([]);
   const [cantidad, setCantidad] = useState<string>("");
   const [posicionRow, setPosicionRow] = useState<string[]>([]);


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
         setResponse("");
      }

      populateList("EstragadoDH");

   }, []);

   const handleDepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDep(e.target.value);
      setResponse("");
      setSearhInput("");
   }

   const handleIngressarCodigo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearhInput(e.target.value);
      setResponse("");

   }

   const filteredOptions = useMemo(() => {
      if (searchInput === '') return [];
      return allCodigos.filter(element => element.toUpperCase().includes(searchInput.toUpperCase())).slice(0, 7);
   }, [searchInput, allCodigos]);


   useEffect(() => {
      const handleSearch = async () => {

         try {
            const res = await fetch("/getRowRecebimientos", {
               method: "POST",
               headers: {
                  "content-type": "application/json"
               },
               body: JSON.stringify({ codigo: searchInput, packingList: "EstragadoDH" })
            });

            if (!res.ok) throw new Error();

            const json = await res.json();
            setEstragadoRow(json.row);

         } catch (error: any) {
            setError(`codigo no existe o no encontrado`);
         }

      }
      if (allCodigos.includes(searchInput)) handleSearch();
      else{ 
         setEstragadoRow([]); 
         setError(null);
         setCantidad("");
      }

   }, [searchInput]);

   useEffect(() => {
      const fetchPosicionRow = async () => {
         try {
            const res = await fetch("/getRow", {
               method: "POST",
               headers: {
                  "content-type": "application/json"
               },
               body: JSON.stringify({ codigo: searchInput, dep: dep.slice(-2) })
            });

            if (!res.ok) throw new Error();
            const json = await res.json();
            setPosicionRow(json.row);

         } catch (error: any) {
            setError(`codigo no existe o no encontrado`);
         }
      }

      if (allCodigos.includes(searchInput)) fetchPosicionRow();
      else {
         setPosicionRow([]);
         setError(null);
         setCantidad("");
      }  

   }, [searchInput]);


   const handleCantidad = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCantidad(e.target.value);
      setResponse("");
   }


   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setResponse("");
      setLoading(true);
      
      const formData = {
         codigo : searchInput,
         dep : dep,
         descripcion : estragadoRow[0],
         cantidad : cantidad
      }


      try {
         const res = await fetch("/estragados", {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({ ...formData })
         });
         const json = await res.json();

         if (!res.ok) {
            console.error(json);
            throw new Error(json)
         };

         setSearhInput("")
         setResponse("Enviado")
      } catch (error: any) {
         setResponse("Problema de Envio")
         setError(error.message);
      } finally {
         setLoading(false);
      }


   }

   return (
      < >
         <fieldset className={styles.wrapper}>
            <legend className={styles.legend}>Estragados</legend>

            <label htmlFor="ingresar-dep">Deposito</label>
            <select className={styles.ingresarDep} name="dep" id="ingresar-dep" value={dep} onChange={handleDepChange}>
               <EstragadosOptions />
            </select>

            <label htmlFor="ingresar-codigo">Codigo</label>
            <input className={`${styles.input} ${styles.ingresarCodigo}`} type="search" name="codigo" id="ingresar-codigo" list="codigoslist" value={searchInput} onChange={handleIngressarCodigo} required />
            <datalist id="codigoslist">
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


         </fieldset>

         <EstragadoResultTable searchInput={searchInput} estragadoRow={estragadoRow} posicionRow={posicionRow}></EstragadoResultTable>

         <fieldset className={styles.wrapper}>
            <legend className={styles.legend}>Cantidad</legend>

            <input className={`${styles.input}`} type="number" pattern="\d+" name="cantidad" value={cantidad} onChange={handleCantidad} />
            <form className={styles.formularioEntradaPosiciones} onSubmit={handleSubmit}>
               <button className={styles.button} type="submit" disabled={loading}>Ingresar</button>
            </form>

         </fieldset>

         {error && <h3 className={styles.reponse}>Ocurrio un erro</h3>}
         {response && <h3 className={styles.reponse}>{response}</h3>}
      </>
   )
}


export default EstragadosForm;