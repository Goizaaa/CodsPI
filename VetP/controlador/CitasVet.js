document.addEventListener("DOMContentLoaded",()=>{

    const mascotas = ["Kira","Nick"];
    const listaMascota = document.querySelector("#mascota");
    mascotas.forEach(mascota => {
        let opcion = document.createElement("option");
        opcion.value = mascota;
        opcion.textContent = mascota;

    listaMascota.appendChild(opcion);
});

const servicios = ["Cita medica","Estetica","Revisión","Vacunación","Otro"];

const listaServicio = document.querySelector("#servicio");

servicios.forEach(servicio => {

    let opcion = document.createElement("option");

    opcion.value = servicio;
    opcion.textContent = servicio;

    listaServicio.appendChild(opcion);
});


    const datos = [
        { id:1, nombre:"Juan", carrera:"Sistemas"},
        { id:2, nombre:"Ana", carrera:"Informática"},
        { id:3, nombre:"Luis", carrera:"Redes"}
        ];
    const tabla = document.querySelector("#tabla");

    datos.forEach(obj => {
        let fila = document.createElement("tr");
        for(let propiedad in obj)
        {
            let celda = document.createElement("td");
            celda.textContent = obj[propiedad];
            fila.appendChild(celda);
        }

        tabla.appendChild(fila); 
    });       
});