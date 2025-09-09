import React, { useEffect, useState } from "react";
import styles from "./3-SearchResultTable.module.css";


interface ISearch {
   searchInput: string,
   row: string[]
}

const RecebimientoResultTable: React.FC<ISearch> = ({ searchInput, row }) => {
   // const [unidadPorCaja, setUnidadPorCaja] = useState<string>("");
   const [descripcion, setDescripcion] = useState<string>("");
   const [codigo, setCodigo] = useState<string>("");
   const [cajas, setCajas] = useState<number | null>(null);
   // const [cajasInteriores, setCajasInteriores] = useState<string>("");
   // const [unidadesEnCajasInteriores, setUnidadesEnCajasInteriores] = useState<string>("");
   // const [peso, setPeso] = useState<string>("");
   // const [largo, setLargo] = useState<number | null>(null);
   // const [ancho, setAncho] = useState<number | null>(null);
   // const [alto, setAlto] = useState<number | null>(null);

   const [posicion, setPosicion] = useState<number | null | "no hay">(null);


   useEffect(() => {
      setCodigo("");
      setDescripcion("");
      // setUnidadPorCaja("");
      setCajas(null);
      // setCajasInteriores("");
      // setUnidadesEnCajasInteriores("");
      // setLargo(null);
      // setAncho(null);
      // setAlto(null);
      // setPeso("");
      setPosicion(null);

   }, [searchInput]);

   useEffect(() => {
      setCodigo(searchInput);
      setDescripcion(row[0]);
      // setUnidadPorCaja(row[1]);
      setCajas(Number(row[2]) || null);
      // setCajasInteriores(row[3]);
      // setUnidadesEnCajasInteriores(row[4]);
      // setLargo(Number(row[7]) / 100 || null);
      // setAncho(Number(row[8]) / 100 || null);
      // setAlto(Number(row[9]) / 100 || null);
      // setPeso(row[10]);
      setPosicion(Number(row[12]) || null);

   }, [row]);


   return (
      <div className={styles.tablesWrapper}>
         <table className={`${styles.table} ${styles.codigo_table}`}>
            <thead>
               <tr className={styles.tr}>
                  <th className={styles.th}>Codigo</th>
                  <th className={styles.th}>Cajas</th>
                  <th className={styles.th}>Posicion</th>
               </tr>
            </thead>
            <tbody>
               <tr className={styles.tr}>
                  <td className={styles.td}>{codigo}</td>
                  <td>{cajas}</td>
                  <td className={styles.td}>{posicion}</td>
               </tr>
            </tbody>
         </table>

         <table className={`${styles.table} ${styles.descripcion_table}`}>
            <thead>
               <tr className={styles.tr}>
                  <th className={styles.th}>Descripcion</th>
               </tr>

            </thead>
            <tbody>
               <tr className={styles.tr}>
                  <td className={styles.td}>{descripcion}</td>
               </tr>
            </tbody>
         </table>

         {/* <table className={`${styles.table} ${styles.posiciones_table}`}>
            <thead>
               <tr className={`${styles.posiciones_headings} ${styles.tr}`}>

                  <th className={styles.th}>Uni/Cjs</th>
                  <th className={styles.th}>Cx Int.</th>
                  <th className={styles.th}>Pz/Cx</th>
               </tr>
               {

               }

            </thead>

            <tbody>
               <tr className={styles.tr}>
                  <td className={styles.td}>{unidadPorCaja}</td>
                  <td>{cajasInteriores}</td>
                  <td>{unidadesEnCajasInteriores}</td>
               </tr>

            </tbody>
         </table>

         <table className={`${styles.table} ${styles.posiciones_table}`}>
            <thead>
               <tr className={`${styles.posiciones_headings} ${styles.tr}`}>

                  <th className={styles.th}>Largo</th>
                  <th className={styles.th}>Ancho</th>
                  <th className={styles.th}>Alto</th>
                  <th className={styles.th}>Kg</th>

               </tr>
            </thead>

            <tbody>
               <tr className={styles.tr}>
                  <td>{largo}</td>
                  <td>{ancho}</td>
                  <td>{alto}</td>
                  <td>{peso}</td>
               </tr>

            </tbody>
         </table> */}
      </div>
   )
}

export default RecebimientoResultTable;