const inputCodigo = document.querySelector("#codigo");
const posiciones = document.querySelector("#posiciones")
const posiciones_table = document.querySelector("#posiciones_table")
const main = document.querySelector("main");
const form = document.querySelector("#search_codigo")


const removeAllChild = () => {
   const allPosiciones = document.querySelectorAll(".posiciones");
   allPosiciones.forEach(element => element.remove());
}

inputCodigo.addEventListener("input", () => {
   removeAllChild();
})

const populatelist = () => {
   fetch("/getAllCodigos")
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
   removeAllChild();

   fetch("/getRow", {
      method: "POST",
      headers: {
         "content-type": "application/json"
      },
      body: JSON.stringify({ codigo: inputCodigo.value })
   })
      .then(async res => {
         if (!res.ok) {
            const response = document.createElement("p");
            response.innerText = "No encontrado";
            main.append(response);
         } else {
            const row = (await res.json()).row;
            console.log(row);
            let newRow = null;

            row.forEach((cell, i) => {
               if(!newRow){
                  newRow = document.createElement("tr");
                  newRow.setAttribute("class", "posiciones");
                  const newCodigoCell = document.createElement("td");
                  newCodigoCell.innerText = inputCodigo.value;
                  newRow.append(newCodigoCell);
               }


               if (i % 5 < 3) {
                  const newPosicion = document.createElement("td");
                  newPosicion.innerText = cell;
                  newRow.append(newPosicion);
               }
               if (newRow.childElementCount === 4) {
                  posiciones_table.append(newRow);
                  newRow = null;
               }

            })
         }
      })
})
