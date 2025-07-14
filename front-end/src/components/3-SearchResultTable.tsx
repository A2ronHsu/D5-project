import React, { useEffect } from "react";

interface ISearch {
   searchInput: string,
   row: string[]
}

const SearchResultTable: React.FC<ISearch> = ({searchInput, row}) => {
   useEffect(()=>{
      console.log(row);
   },[row]);

   return (
      <>
         <table className="table" id="codigo_table">
            <thead>
               <tr>
                  <th>Codigo</th>
                  <th>Uni/Cjs</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>{searchInput}</td>
                  <td>{row[0]}</td>
               </tr>
            </tbody>
         </table>

         <table className="table" id="descripcion_table">
            <thead>
               <tr>
                  <th>Descripcion</th>
               </tr>
               
            </thead>
            <tbody>
               <tr>
                  <td>{row[1]}</td>
               </tr>
            </tbody>
         </table>

         <table className="table" id="posiciones_table">
            <thead>
               <tr className="posiciones_headings">

                  <th>Pas</th>
                  <th>Blo</th>
                  <th>Sec</th>
               </tr>

            </thead>

            <tbody>
               <tr className="deletable">
                  <td></td>
                  <td></td>
                  <td></td>
               </tr>

            </tbody>

         </table>
      </>
   )
}

export default SearchResultTable;