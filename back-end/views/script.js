const codigosListContainer = document.querySelector("#codigoslist");
const inputCodigo = document.querySelector("#codigo");




const populateDataList = async () => {
   const cache = await caches.open('codigolist');
   cache.add("http://localhost:3000/getAllCodigos")
   fetch("")
      .then(async res => await res.json())
      .then((allCodigos=[]) => {
         console.log(allCodigos);
         allCodigos.allCodigos.forEach(codigo =>{
            const option = document.createElement("option");
            option.setAttribute("value",codigo);
            codigosListContainer.append(option);
         })

      })
};

populateDataList();

