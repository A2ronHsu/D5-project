const codigosListContainer = document.querySelector("#codigoslist");
const inputCodigo = document.querySelector("#codigo");
const inputDep = document.querySelector("#dep");
const form = document.querySelector("#formulario_entrada_posiciones");
const formResponse = document.querySelector("#response");

const removeAllChild = (element = codigosListContainer) => {
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }
}



const populateDataList = async (dep) => {
   // const cache = await caches.open("codigolist");
   // const isChached = await cache.match("/getAllCodigos");
   // if (isChached) {
   //    const allCodigos = await isChached.json();
   //    console.log(allCodigos);
   //    allCodigos.allCodigos.forEach(codigo => {
   //       const option = document.createElement("option");
   //       option.setAttribute("value", codigo);
   //       codigosListContainer.append(option);
   //    })
   // }

   fetch(`/getAllCodigos/${dep}`)
      .then(async res => await res.json())
      .then(async (allCodigos = []) => {
         console.log(allCodigos);


         // const cacheResponse = new Response(JSON.stringify(allCodigos));
         // await cache.put("/getAllCodigos", cacheResponse);

         removeAllChild(codigosListContainer);
         allCodigos.allCodigos.forEach(codigo => {
            const option = document.createElement("option");
            option.setAttribute("value", codigo);
            codigosListContainer.append(option);
         })

      })
};

populateDataList(inputDep.value);

inputDep.addEventListener("input", () => {
   populateDataList(inputDep.value);
})



let prevInputValue;

form.addEventListener("submit", (event) => {
   event.preventDefault();
   removeAllChild(formResponse);

   prevInputValue = inputDep.value;

   const formData = {
      codigo: document.querySelector("#codigo").value,
      pasillo: document.querySelector("#pasillo").value,
      bloco: document.querySelector("#bloco").value,
      secuencia: document.querySelector("#secuencia").value,
      dep: document.querySelector("#dep").value
   }
   console.log(formData);




   fetch("/submit", {
      method: "POST",
      headers: {
         "content-type": "application/json"
      },
      body: JSON.stringify(formData)
   })
      .then(async res => {

         if (res.status !== 200) {
            const formResponseContent = document.createElement("p");
            formResponseContent.innerText = "Problema con el envio";
            formResponse.append(formResponseContent);
         } else {
            const formResponseContent = document.createElement("p");
            formResponseContent.innerText = "posicion enviada";
            formResponse.append(formResponseContent);
            form.reset();

         }

         inputDep.value = prevInputValue;



      })




})



