import React, { useEffect, useMemo, useState, type ChangeEvent } from "react";
import PackingListOptions from "./-1-PackingListOptions";
import styles from "./4a-PosicionForm.module.css";
import RecebimientoResultTable from "./9b-RecebimientoResultTable";


const RecebimientoSearchForm: React.FC = () => {
   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [response, setResponse] = useState<string>("");

   const [packingList, setPackingList] = useState<string>("GT029");
   const [searchInput, setSearhInput] = useState<string>("");

   const [unidadPosicion, setUnidadPosicion] = useState<number>(0);


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
         setResponse("");
      }

      const getCurrentPosicionRecebimiento = async (packingList: string) => {
         try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/getLastPosicionRecebimientos/${packingList}`);
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`)
            }
            const resJson = await res.json();
            const posicion: number = resJson.lastPosicion;

            // setLastPosicion(posicion);
            setUnidadPosicion(posicion + 1);

            return posicion;

         } catch (err: any) {
            setError(err.message)
            setAllCodigos([]);
         } finally {
            setLoading(false);
         }
         setResponse("");

      }

      populateList(packingList);
      getCurrentPosicionRecebimiento(packingList);
      setSearhInput("");
      setError(null);

   }, [packingList])




   const handlePackingListChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setPackingList(event.target.value);
      setResponse("");

   }

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setResponse("");
      setLoading(true);
      
      const formData = {
         codigo: searchInput,
         packingList: packingList,
         unidadPosicion: unidadPosicion
      }

      try {
         const res = await fetch("/submitRecebimiento", {
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
         setUnidadPosicion(unidadPosicion + 1);
      } catch (error: any) {
         setResponse("Problema de Envio")
         setError(error.message);
      } finally {
         setLoading(false);
      }


   }

   const handleIngressarCodigo = (event: ChangeEvent<HTMLInputElement>) => {
      setSearhInput(event.target.value);
      setResponse("");

   }

   const handleSearchButtton = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setLoading(true)
      try {
         const res = await fetch("/getRowRecebimientos", {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({ codigo: searchInput, packingList: packingList })
         });

         if (!res.ok) throw new Error();

         const json = await res.json();
         setRow(json.row);

      } catch (error: any) {
         setError(`codigo no existe o no encontrado`);
      } finally {
         setLoading(false);
      }

   }

   const handleUnidadPosicion = (event: ChangeEvent<HTMLInputElement>) => {
      setUnidadPosicion(Number(event.target.value));
   }






   const filteredOptions = useMemo(() => {
      if (searchInput === '') return [];
      return allCodigos.filter(element => element.toUpperCase().includes(searchInput.toUpperCase())).slice(0, 7);
   }, [searchInput, allCodigos]);



   return (
      < >
         <fieldset className={styles.wrapper}>
            <legend className={styles.legend}>Deposito y Codigo</legend>

            <label htmlFor="ingresar-dep">Packing List</label>
            <select className={styles.ingresarDep} name="dep" id="ingresar-dep" value={packingList} onChange={handlePackingListChange}>
               <PackingListOptions />
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

            <form onSubmit={handleSearchButtton} >
               <button className={styles.button} type="submit" disabled={loading}>Buscar Posicion</button>
            </form>
         </fieldset>
         {row[12] && <h3 className={styles.reponse}>Codigo ya hay posicion</h3>}

         <RecebimientoResultTable searchInput={searchInput} row={row}></RecebimientoResultTable>

         <fieldset className={styles.wrapper}>
            <legend className={styles.legend}>Ingresar Posicion</legend>





            <label htmlFor="unidadPosicion">Posicion Actual</label>
            <input className={`${styles.input} ${styles.ultimaPosicion}`} type="number" name="unidadPosicion" id="unidadPosicion" value={unidadPosicion} onChange={handleUnidadPosicion} required disabled />


            <form className={styles.formularioEntradaPosiciones} onSubmit={handleSubmit}>
               <button className={styles.button} type="submit" disabled={loading || row[12] !== undefined} >Ingresar</button>
            </form>
         </fieldset>

         {error && <h3 className={styles.reponse}>Ocurrio un erro</h3>}
         {response && <h3 className={styles.reponse}>{response}</h3>}
      </>
   )
}

export default RecebimientoSearchForm;