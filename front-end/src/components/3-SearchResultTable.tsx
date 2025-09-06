import React, { useEffect, useState, type ReactElement } from "react";
import styles from "./3-SearchResultTable.module.css";


interface ISearch {
   searchInput: string,
   row: string[]
}

const SearchResultTable: React.FC<ISearch> = ({ searchInput, row }) => {
   const [unidadPorCaja, setUnidadPorCaja] = useState<string>("");
   const [descripcion, setDescripcion] = useState<string>("");
   const [codigo, setCodigo] = useState<string>("");
   const [content, setContent] = useState<ReactElement[]>([]);
   useEffect(() => {
      setUnidadPorCaja("");
      setDescripcion("");
      setCodigo("");
      setContent([]);
   }, [searchInput]);

   useEffect(() => {
      setCodigo(searchInput);
      setUnidadPorCaja(row[0]);
      setDescripcion(row[1]);
      tableContent();
   }, [row]);

   const tableContent = () => {
      let posicion = [];
      let content: ReactElement[] = [];
      for (let i = 2; i < row.length; i++) {
         if ((i - 2) % 5 < 3){
            posicion.push(<td className={styles.td} key={`p${i}`}>{row[i]}</td>);
         }
         if (posicion.length == 3){
            content.push(<tr className={styles.tr} key={`c${i}`}>{...posicion}</tr>)
            posicion = [];
         }
      }
      setContent(content);
   }




   return (
      <div className={styles.tablesWrapper}>
         <table className={`${styles.table} ${styles.codigo_table}`}>
            <thead>
               <tr className={styles.tr}>
                  <th className={styles.th}>Codigo</th>
                  <th className={styles.th}>Uni/Cjs</th>
               </tr>
            </thead>
            <tbody>
               <tr className={styles.tr}>
                  <td className={styles.td}>{codigo}</td>
                  <td className={styles.td}>{unidadPorCaja}</td>
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

         <table className={`${styles.table} ${styles.posiciones_table}`}>
            <thead>
               <tr className={`${styles.posiciones_headings} ${styles.tr}`}>

                  <th className={styles.th}>Pas</th>
                  <th className={styles.th}>Blo</th>
                  <th className={styles.th}>Sec</th>
               </tr>
               {

               }

            </thead>

            <tbody>
               {content}

            </tbody>



         </table>
      </div>
   )
}

export default SearchResultTable;