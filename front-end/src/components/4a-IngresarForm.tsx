import React, { useEffect, useMemo, useState, type ChangeEvent } from "react";
import "./4a-ingresarForm.css";
import { DepOptions } from "./-1-DepOptions";
import SearchResultTable from "./3-SearchResultTable";


const IngresarForm: React.FC = () => {
   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [response, setResponse] = useState<string>("");

   const [searchInput, setSearhInput] = useState<string>("")
   const [pasillo, setPasillo] = useState<string>("");
   const [bloco, setBloco] = useState<string>("");
   const [secuencia, setSecuencia] = useState<string>("");
   const [dep, setDep] = useState<string>("D5");



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

      populateList(dep);
      setSearhInput("");
      setPasillo("");
      setBloco("");
      setSecuencia("");
      setError(null);

   }, [dep])

   const handleDepChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
      setResponse("");

   }

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setResponse("");
      setLoading(true);
      const formData = {
         codigo: searchInput,
         pasillo: pasillo,
         bloco: bloco,
         secuencia: secuencia,
         dep: dep
      }

      try {
         const res = await fetch("/submit", {
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
         setPasillo("");
         setBloco("");
         setSecuencia("");
         setResponse("Enviado")
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
      } finally {
         setLoading(false);
      }

   }

   const handlePasillo = (event: ChangeEvent<HTMLInputElement>) => {
      setPasillo(event.target.value);
   }

   const handleBloco = (event: ChangeEvent<HTMLInputElement>) => {
      setBloco(event.target.value);
   }

   const handleSecuencia = (event: ChangeEvent<HTMLInputElement>) => {
      setSecuencia(event.target.value);
   }

   const filteredOptions = useMemo(() => {
      if (searchInput === '') return [];
      return allCodigos.filter(element => element.toUpperCase().includes(searchInput.toUpperCase())).slice(0, 7);
   }, [searchInput,allCodigos]);



   return (
      <div className="entrada_posiciones">
         <form id="formulario_entrada_posiciones" onSubmit={handleSubmit}>
            <fieldset className="entrada_posiciones">
               <legend>
                  Entrada de posiciones
               </legend>
               <label htmlFor="ingresar-dep">Deposito</label>
               <select name="dep" id="ingresar-dep" value={dep} onChange={handleDepChange}>
                  <DepOptions />
               </select>
               {loading && <h3>Cargando</h3>}

               <label htmlFor="ingresar-codigo">Codigo</label>
               <input type="search" name="codigo" id="ingresar-codigo" list="codigoslist" value={searchInput} onChange={handleIngressarCodigo} required />
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


               <label htmlFor="passillo">Pasillo</label>
               <input type="number" name="pasillo" id="pasillo" pattern="\d+" value={pasillo} onChange={handlePasillo} required />

               <label htmlFor="bloco">Bloco</label>
               <input type="number" name="bloco" id="bloco" pattern="\d+" value={bloco} onChange={handleBloco} required />

               <label htmlFor="secuencia">Secuencia</label>
               <input type="number" name="secuencia" id="secuencia" pattern="\d+" value={secuencia} onChange={handleSecuencia} required />
               <button type="submit" disabled={loading} >Enviar</button>
            </fieldset>
         </form>
         <form onSubmit={handleSearchButtton}>
            <button type="submit" disabled={loading}>Buscar Posicion</button>
         </form>
         {error && <h3>Ocurrio un erro</h3>}
         {response && <h3>{response}</h3>}
         <SearchResultTable searchInput={searchInput} row={row}></SearchResultTable>
      </div>
   )
}

export default IngresarForm;