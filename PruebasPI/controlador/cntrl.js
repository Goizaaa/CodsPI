document.addEventListener("DOMContentLoaded",()=>{

    const tabla = document.querySelector("#tabla");

    fetch("../Modelo/modelomascotq.php")
        .then(res => res.json())
        .then(datos => {



            datos.forEach(obj => {

                let fila = document.createElement("tr");

                for(let propiedad in obj) {
                    let celda = document.createElement("td");
                    celda.textContent = obj[propiedad];
                    fila.appendChild(celda);
                }

                tabla.appendChild(fila); 
            });

        });

});