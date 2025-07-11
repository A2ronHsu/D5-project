import React from "react";

const SearchResultTable: React.FC = () => {
   return (
      <>
         <table className="table" id="codigo_table">
            <thead>
               <tr>
                  <th>Codigo</th>
                  <th>Uni/Cjs</th>
               </tr>
            </thead>
         </table>

         <table className="table" id="descripcion_table">
            <tbody>
               <tr>
                  <th>Descripcion</th>

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