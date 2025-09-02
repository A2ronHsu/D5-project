import React, { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";
import Nav from "./1-Nav";

const Devoluciones: React.FC = () => {
   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [response, setResponse] = useState<string>("");

   const [dep, setDep] = useState<string>("D1");
   const [codigo, setCodigo] = useState<string>("");
   const [bloco, setBloco] = useState<string>("");
   const [cantidad, setCantidad] = useState<string>("");

   const auth = useAuth();


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

      populateList("DannyHome");
   }, []);

   useEffect(() => {
      console.log(allCodigos);
   }, [allCodigos]);



   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setResponse("");
      setLoading(true);
      setResponse("");

      const date = new Date();
      const formData = {
         fecha: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
         dep: dep,
         codigo: codigo,
         bloco: bloco,
         cantidad: cantidad

      }

      try {
         const res = await fetch("/dannyhome/transfer/post", {
            method: "POST",
            headers: {
               "content-type": "application/json"
            },
            body: JSON.stringify({ ...formData })
         })

         const json = await res.json();

         if (!res.ok) {
            console.error(json);
            throw new Error(JSON.stringify(json));
         }
         setResponse("Enviado");
         setCodigo("");
         setBloco("");
         setCantidad("");
         setError(null);

      } catch (err: any) {
         setResponse("Problema de Envio");
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   const handleDep = (event: ChangeEvent<HTMLSelectElement>) => {
      setDep(event.target.value);
   }



   const handleCodigo = (event: ChangeEvent<HTMLInputElement>) => {
      setCodigo(event.target.value);
   };

   const handleBloco = (event: ChangeEvent<HTMLInputElement>) => {
      setBloco(event.target.value);
   };

   const handleCantidad = (event: ChangeEvent<HTMLInputElement>) => {
      setCantidad(event.target.value);
   }

   const filteredOptions = useMemo(() => {
      if (codigo === '') return [];
      return allCodigos.filter(element => element.toUpperCase().includes(codigo.toUpperCase())).slice(0, 7);
   }, [codigo, allCodigos]);

   return (
      
      <div id="wrapper">
         <Nav></Nav>
         {loading && <h3>Cargando</h3>}
         <form id="transfer" onSubmit={handleSubmit}>
            <fieldset id="transferFieldset">
               <legend>
                  Devoluciones
               </legend>


               <label htmlFor="deposito">Deposito de Origen</label>
               <select name="dep" id="deposito" value={dep} onChange={handleDep} required>
                  <option value="D1">D1</option>
                  <option value="D2">D2</option>
                  <option value="D4">D4</option>
                  <option value="D5">D5</option>
               </select>

               <label htmlFor="transfercodigo">Codigo</label>
               <input type="search" name="codigo" id="transfercodigo" list="codigoslist" value={codigo} onChange={handleCodigo} required />
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

               <label htmlFor="tbloco">Bloco</label>
               <input type="number" name="bloco" id="tbloco" value={bloco} onChange={handleBloco} required />

               <label htmlFor="cantidad">Cantidad en Unidades</label>
               <input type="number" name="cantidad" id="cantidad" value={cantidad} onChange={handleCantidad} required />

               <button id="submitbtn" type="submit" disabled={loading}>Enviar</button>
            </fieldset>
         </form>
         {error && <h3>Ocurrio un erro</h3>}
         {response && <h3>{response}</h3>}
         <button id="logoutbtn" onClick={()=>auth.logout()}>logout</button>
      </div>
   )
}

export default Devoluciones;