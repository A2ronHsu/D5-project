import React, { useEffect, useState, type ReactElement } from "react";
import styles from "./3-SearchResultTable.module.css";

interface ISearch {
   searchInput: string,
   estragadoRow: string[],
   posicionRow: string[],
}

const EstragadoResultTable: React.FC<ISearch> = ({ searchInput, estragadoRow, posicionRow }) => {
   
   const [content, setContent] = useState<ReactElement[]>([]);
   useEffect(() => {
      setContent([]);
      tableContent();
   }, [posicionRow]);

      const tableContent = () => {
      let posicion = [];
      let content: ReactElement[] = [];
      for (let i = 2; i < posicionRow.length; i++) {
         console.log(posicionRow[i])
         if ((i - 2) % 5 < 3){
            posicion.push(<td className={styles.td} key={`p${i}`}>{posicionRow[i]}</td>);
         }
         if (posicion.length == 3){
            content.push(<tr className={styles.tr} key={`c${i}`}>{...posicion}</tr>)
            posicion = [];
         }
      }
      console.log(posicionRow);
      setContent(content);
   }
   return (
      <div className={styles.tablesWrapper}>
         <table className={`${styles.table} ${styles.codigo_table}`}>
            <thead>
               <tr className={styles.tr}>
                  <th className={styles.th}>Codigo</th>
                  <th className={styles.th}>Cajas</th>
               </tr>
            </thead>
            <tbody>
               <tr className={styles.tr}>
                  <td className={styles.td}>{searchInput}</td>
                  <td>{estragadoRow[2]}</td>
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
                  <td className={styles.td}>{estragadoRow[0]}</td>
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
            </thead>

            <tbody>
               {content}

            </tbody>



         </table>
      </div>
   )
}

export default EstragadoResultTable;
