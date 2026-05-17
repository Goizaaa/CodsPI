document.addEventListener('DOMContentLoaded', function () {
    const inicio = document.querySelector("#inicio");
    const recuperar = document.querySelector("#recuperar");
    const restablecer = document.querySelector("#restablecer");
    const dospasos = document.querySelector("#dospasos");
    const crear = document.querySelector("#crear");

    let usuarioRecuperacion = null;

    if (inicio && recuperar && restablecer && dospasos && crear) {
        inicio.style.display = "block";
        recuperar.style.display = "none";
        restablecer.style.display = "none";
        dospasos.style.display = "none";
        crear.style.display = "none";
    }


    const abreinicio = document.querySelector("#abreinicio");
    const abrerecuperar = document.querySelector("#abrerecuperar");
    const abrerestablecer = document.querySelector("#abrerestablecer");
    const abredospasos = document.querySelector("#abredospasos");
    const abrecrear = document.querySelector("#abrecrear");
    const btnConfirmar = document.querySelector("#CONFIRMAR");
    const btnConfirmarC = document.querySelector("#ConfirC");

    abrerecuperar.addEventListener("click", (event) => {
        event.preventDefault();
        recuperar.style.display = "block";
        inicio.style.display = "none";
        restablecer.style.display = "none";
        dospasos.style.display = "none";
        crear.style.display = "none";
    });

    abrecrear.addEventListener("click", (event) => {
        event.preventDefault();
        recuperar.style.display = "none";
        inicio.style.display = "none";
        restablecer.style.display = "none";
        dospasos.style.display = "none";
        crear.style.display = "block";
    });
        btnConfirmar.addEventListener("click", (event) => {
            event.preventDefault();
        recuperar.style.display = "none";
        inicio.style.display = "none";
        restablecer.style.display = "none";
        dospasos.style.display = "block";
        crear.style.display = "none";
    });

        btnConfirmarC.addEventListener("click", (event) => {
        event.preventDefault();
        recuperar.style.display = "none";
        inicio.style.display = "none";
        restablecer.style.display = "block";
        dospasos.style.display = "none";
        crear.style.display = "none";
    });

     const btnConfirmarRecuperacion = document.querySelector("#CONFIRMAR");
     if (btnConfirmarRecuperacion) {
        btnConfirmarRecuperacion.addEventListener("click", function(event) {
            event.preventDefault();
            
            let correoRecuperacion = document.getElementById("usuarioD").value.trim();
            let errores = [];
            
            if (correoRecuperacion === "") {
                errores.push("Ingresa tu correo electrónico.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoRecuperacion)) {
                errores.push("El formato del correo no es válido.");
            }
            
            if (errores.length > 0) {
                alert(errores.join("\n"));
                return;
            }
            
            let datos = new FormData();
            datos.append("buscar_usuario", true);
            datos.append("correo", correoRecuperacion);
            
            fetch("../Controlador/ControLogin.php", {
                method: "POST",
                body: datos
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(respuesta) {
                if (respuesta.status) {
                    usuarioRecuperacion = respuesta.usuario;
                    
                    recuperar.style.display = "none";
                    inicio.style.display = "none";
                    restablecer.style.display = "none";
                    crear.style.display = "none";
                    dospasos.style.display = "block";
                } else {
                    alert(respuesta.mensaje);
                }
            })
            .catch(function(error) {
                console.log(error);
                alert("Error al verificar el correo.");
            });
        });
    }
    const btnConfirmarCodigo = document.querySelector("#ConfirC");

    if (btnConfirmarCodigo) {
        btnConfirmarCodigo.addEventListener("click", function(event) {
            event.preventDefault();
            
            let codigo = document.getElementById("usuarioC").value.trim();
            
            if (codigo === "3221") {
                if (usuarioRecuperacion) {
                    document.getElementById("correo_original").value = usuarioRecuperacion.correo;
                    document.getElementById("correo_restablecer").textContent = usuarioRecuperacion.correo;
                    document.getElementById("nombre_restablecer").textContent = usuarioRecuperacion.nombre;
                }
                
                recuperar.style.display = "none";
                inicio.style.display = "none";
                dospasos.style.display = "none";
                crear.style.display = "none";
                restablecer.style.display = "block";
            } else {
                alert("Código incorrecto. El código es: 3221");
            }
        });
    }
     const btnRestablecer = document.querySelector("#Restabtn");

    if (btnRestablecer) {
        btnRestablecer.addEventListener("click", function(event) {
            event.preventDefault();
            
            let nuevaPassword = document.getElementById("contraseñaT").value.trim();
            let confirmarPassword = document.getElementById("contraseñadTR").value.trim();
            let errores = [];
            
            if (nuevaPassword === "") {
                errores.push("Ingresa tu nueva contraseña.");
            } else if (nuevaPassword.length < 4) {
                errores.push("La contraseña debe tener al menos 4 caracteres.");
            }
            
            if (nuevaPassword !== confirmarPassword) {
                errores.push("Las contraseñas no coinciden.");
            }
            
            if (errores.length > 0) {
                alert(errores.join("\n"));
                return;
            }
            
            if (!usuarioRecuperacion) {
                alert("No se encontró información. Reinicia el proceso.");
                return;
            }
            
            let datos = new FormData();
            datos.append("actualizar_password", true);
            datos.append("correo", usuarioRecuperacion.correo);
            datos.append("password", nuevaPassword);
            
            fetch("../Controlador/ControLogin.php", {
                method: "POST",
                body: datos
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(respuesta) {
                alert(respuesta.mensaje);
                
                if (respuesta.status) {
                    document.getElementById("contraseñaT").value = "";
                    document.getElementById("contraseñadTR").value = "";
                    document.getElementById("usuarioD").value = "";
                    document.getElementById("usuarioC").value = "";
                    usuarioRecuperacion = null;
                    
                    recuperar.style.display = "none";
                    dospasos.style.display = "none";
                    restablecer.style.display = "none";
                    crear.style.display = "none";
                    inicio.style.display = "block";
                }
            })
            .catch(function(error) {
                console.log(error);
                alert("Error al actualizar la contraseña.");
            });
        });
    }



const $form = document.getElementById('registro');
    const $email = document.getElementById('correoU');
    const $password = document.getElementById('contraU');
    const $messages = $form ? $form.querySelector('.mensaje') : null;

    if ($form) {
        $form.addEventListener('submit', function (event) {
            event.preventDefault();

            let email = $email.value.trim();
            let password = $password.value.trim();
            let errors = [];

            // Validación de correo
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                $email.classList.remove('error');
            } else {
                errors.push('El email no es válido.<br>');
                $email.classList.add('error');
            }

            // Validación de contraseña
            if (password.length >= 4) {
                $password.classList.remove('error');
            } else {
                errors.push('La contraseña debe tener al menos 4 caracteres.<br>');
                $password.classList.add('error');
            }

            // Mostrar errores
            if (errors.length > 0) {
                if ($messages) {
                    $messages.innerHTML = errors.join('');
                    $messages.classList.add('show');
                }
            } else {
                if ($messages) {
                    $messages.classList.remove('show');
                }

                let datos = new FormData();

                datos.append("login", true);
                datos.append("correo", email);
                datos.append("password", password);

                fetch("../Controlador/ControLogin.php", {
                    method: "POST",
                    body: datos
                })
                .then(function (res) {
                    return res.json();
                })
                .then(function (datos) {
                    alert(datos.mensaje);

                    if (datos.status) {
                        window.location.href = "../Vista/index.html";
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        });
    }
     const btnCrear = document.getElementById("crearbtn");

    if (btnCrear) {
        btnCrear.addEventListener("click", function (event) {
            event.preventDefault();
            let nombre = document.getElementById("NomU").value.trim();
            let apellidoPaterno = document.getElementById("aPpU").value.trim();
            let apellidoMaterno = document.getElementById("aPmU").value.trim();
            let correo = document.getElementById("usuarioCI").value.trim();
            let confirmarCorreo = document.getElementById("usuarioaCI").value.trim();
            let password = document.getElementById("contraseñaCI").value.trim();
            let confirmarPassword = document.getElementById("contraseñaa").value.trim();

            let errores = [];
            if (nombre === "") {
                errores.push("Ingresa tu nombre.");
            }
            if (apellidoPaterno === "") {
                errores.push("Ingresa tu apellido paterno.");
            }
            if (apellidoMaterno === "") {
                errores.push("Ingresa tu apellido materno.");
            }

            // Validar correo
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                errores.push("El correo no es válido.");
            }

            // Confirmar correo
            if (correo !== confirmarCorreo) {
                errores.push("Los correos no coinciden.");
            }

            // Validar contraseña
            if (password.length < 4) {
                errores.push("La contraseña debe tener al menos 4 caracteres.");
            }

            // Confirmar contraseña
            if (password !== confirmarPassword) {
                errores.push("Las contraseñas no coinciden.");
            }

            // Mostrar errores
            if (errores.length > 0) {
                alert(errores.join("\n"));
                return;
            }



            let datos = new FormData();

            datos.append("crear", true);
            datos.append("correo", correo);
            datos.append("password", password);
            datos.append("nombre", nombre);
            datos.append("apellido_paterno", apellidoPaterno);
            datos.append("apellido_materno", apellidoMaterno);

            fetch("../Controlador/ControLogin.php", {
                method: "POST",
                body: datos
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (datos) {
                alert(datos.mensaje);

                if (datos.status) {
                    // Regresar al formulario de inicio de sesión

                    inicio.style.display = "block";
                    recuperar.style.display = "none";
                    restablecer.style.display = "none";
                    dospasos.style.display = "none";
                    crear.style.display = "none";

                    // Limpiar campos
                    document.getElementById("NomU").value = "";
                    document.getElementById("aPpU").value = "";
                    document.getElementById("aPmU").value = "";
                    document.getElementById("usuarioCI").value = "";
                    document.getElementById("usuarioaCI").value = "";
                    document.getElementById("contraseñaCI").value = "";
                    document.getElementById("contraseñaa").value = "";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        });
    }
});