const inputCodigo = document.querySelector("#codigo");
const inputDep = document.querySelector("#dep");
const posiciones = document.querySelector("#posiciones")
const posiciones_table = document.querySelector("#posiciones_table")
const main = document.querySelector("main");
const form = document.querySelector("#search_codigo");
const codigoTable = document.querySelector("#codigo_table");
const descripcionTable = document.querySelector("#descripcion_table");


const removeDeletable = () => {
   const allPosiciones = document.querySelectorAll(".deletable");
   allPosiciones.forEach(element => element.remove());
}

inputCodigo.addEventListener("input", () => {
   removeDeletable();
})

const populatelist = () => {
   fetch("/getAllCodigos/D5")
      .then(async res => {
         const row = (await res.json()).allCodigos;
         console.log(row);

         const datalist = document.querySelector("#listCodigo");
         row.forEach(codigo => {
            const option = document.createElement("option");
            option.setAttribute("value", codigo);
            datalist.append(option);
         })

      })
}

populatelist();

form.addEventListener("submit", (event) => {
   event.preventDefault();
   removeDeletable();

   fetch("/getRow", {
      method: "POST",
      headers: {
         "content-type": "application/json"
      },
      body: JSON.stringify({ codigo: inputCodigo.value, dep:inputDep.value })
   })
      .then(async res => {
         if (!res.ok) {
            removeDeletable();
            const response = document.createElement("p");
            response.innerText = "No encontrado";
            response.setAttribute("class", "deletable")
            main.append(response);
         } else {
            const row = (await res.json()).row;
            console.log(row);

            const codigoRow = document.createElement("tr");
            codigoRow.setAttribute("class", "deletable");
            const codigoColumn = document.createElement("td");
            const packColumn = document.createElement("td");
            codigoColumn.innerText = inputCodigo.value;
            packColumn.innerText = row[0];
            codigoRow.append(codigoColumn, packColumn);
            codigoTable.appendChild(codigoRow);


            const descripcionRow = document.createElement("tr");
            descripcionRow.setAttribute("class", "deletable");
            const descripcionColumn = document.createElement("td");
            descripcionColumn.innerText = row[1];
            descripcionRow.appendChild(descripcionColumn);
            descripcionTable.appendChild(descripcionRow);


            let newRow = null;

            for (i = 2; i < row.length; i++) {
               if (!newRow) {
                  newRow = document.createElement("tr");
                  newRow.setAttribute("class", "deletable");
               }


               if ((i - 2) % 5 < 3) {
                  const newPosicion = document.createElement("td");
                  newPosicion.innerText = row[i];
                  newRow.append(newPosicion);
               }
               if (newRow.childElementCount === 3) {
                  posiciones_table.append(newRow);
                  newRow = null;
               }

            }
         }
      })
})
