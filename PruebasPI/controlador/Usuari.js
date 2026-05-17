document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('cuerpo-tabla');

    function cargarUsuarios() {
        fetch("../modelo/modeloUsuario.php")   
            .then(response => response.json())
            .then(usuarios => {
                tbody.innerHTML = '';
                usuarios.forEach(usuario => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${usuario.id_usuario}</td>
                        <td>${usuario.nombre || ""}</td>
                        <td>${usuario.apellido_paterno || ""}</td>
                        <td>${usuario.apellido_materno || ""}</td>
                        <td>${usuario.correo || ""}</td>
                        <td>${usuario.password || ""}</td>
                        <td>
                            <button class="editar" data-id="${usuario.id_usuario}">Editar</button>
                            <button class="eliminar" data-id="${usuario.id_usuario}">Eliminar</button>
                        </td>
                    `;
                     // Evento click para seleccionar fila
                    fila.addEventListener('click', function() {
                        // Remover selección anterior
                        if (filaSeleccionada) {
                            filaSeleccionada.classList.remove('seleccionado');
                        }
                        // Seleccionar nueva fila
                        fila.classList.add('seleccionado');
                        filaSeleccionada = fila;
                        usuarioSeleccionadoId = usuario.id_usuario;
                        btnModificar.disabled = false;
                        btnEliminar.disabled = false;
                    });
                    tbody.appendChild(fila);
                });
                // Asignar eventos a los botones
                document.querySelectorAll(".editar").forEach(btn => {
                    btn.addEventListener("click", () => editarUsuario(btn.dataset.id));
                });
                document.querySelectorAll(".eliminar").forEach(btn => {
                    btn.addEventListener("click", () => eliminarUsuario(btn.dataset.id));
                });
            })
            .catch(err => console.error("Error al cargar usuarios:", err));
    }

    function editarUsuario(id) {
        const fila = document.querySelector(`.editar[data-id='${id}']`).closest("tr");
        const correoActual = fila.cells[4].innerText;

        const nuevoCorreo = prompt("Nuevo correo electrónico:", correoActual);
        if (nuevoCorreo === null) return;

        if (!nuevoCorreo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCorreo)) {
            alert("Correo inválido");
            return;
        }

        let nuevaPassword = "";
        const cambiarPass = confirm("¿Desea cambiar la contraseña?");
        if (cambiarPass) {
            nuevaPassword = prompt("Nueva contraseña (mínimo 4 caracteres):");
            if (nuevaPassword === null) return;
            if (nuevaPassword.length < 4) {
                alert("La contraseña debe tener al menos 4 caracteres");
                return;
            }
            const confirmar = prompt("Confirme la nueva contraseña:");
            if (confirmar !== nuevaPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
        }

        const formData = new FormData();
        formData.append("opc", "update");
        formData.append("id_usuario", id);
        formData.append("correo", nuevoCorreo.trim());
        if (cambiarPass && nuevaPassword) {
            formData.append("password", nuevaPassword);
        }

        fetch("../Controlador/ControlUsuarios.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(resp => {
            alert(resp.message);
            if (resp.success) cargarUsuarios();
        })
        .catch(err => alert("Error: " + err));
    }

    function eliminarUsuario(id) {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            const formData = new FormData();
            formData.append("opc", "delete");
            formData.append("id_usuario", id);
            fetch("../Controlador/ControlUsuarios.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(resp => {
                alert(resp.message);
                if (resp.success) cargarUsuarios();
            })
            .catch(err => alert("Error: " + err));
        }
    }


    cargarUsuarios();  // Iniciar la carga
});