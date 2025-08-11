import React, { useEffect, useState, type ChangeEvent } from "react";

const Transfer: React.FC = () => {
   const [allCodigos, setAllCodigos] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const [codigo, setCodigo] = useState<string>("");
   const [bloco, setBloco] = useState<string>("");

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

   const handleSubmit = () => { };

   const handleCodigo = (event:ChangeEvent<HTMLInputElement>) => {
      setCodigo(event.target.value);
    };

   const handleBloco = (event:ChangeEvent<HTMLInputElement>) => {
      setBloco(event.target.value);
    };


   return (
      <div>
         {loading && <h3>Cargando</h3>}
         <form id="tranfer" onSubmit={handleSubmit}>
            <fieldset>
               <legend>
                  Tranferencia
               </legend>
               
               <input type="date" name="fecha" id="fecha" value={new Date().toString()} hidden/>

               <label htmlFor="deposito">Deposito de Origen</label>
               <input

               <label htmlFor="codigo">Codigo</label>
               <input type="search" name="codigo" id="codigo" list="codigoslist" value={codigo} onChange={handleCodigo} required />
               <datalist id="codigolist">
                  {
                     allCodigos.map((codigo, i) => {
                        return <option key={i} value={codigo}>{codigo}</option>
                     })
                  }
               </datalist>

               <label htmlFor="bloco">Bloco</label>
               <input type="number" name="bloco" id="bloco" pattern="\d+" value={bloco} onChange={handleBloco} />

               

            </fieldset>
         </form>
      </div>
   )
}

export default Transfer;