document.addEventListener('DOMContentLoaded', function () {
    const inicio = document.querySelector("#inicio");
    const recuperar = document.querySelector("#recuperar");
    const restablecer = document.querySelector("#restablecer");
    const dospasos = document.querySelector("#dospasos");
    const crear = document.querySelector("#crear");

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

            let correo = document.getElementById("usuarioCI").value.trim();
            let confirmarCorreo = document.getElementById("usuarioaCI").value.trim();
            let password = document.getElementById("contraseñaCI").value.trim();
            let confirmarPassword = document.getElementById("contraseñaa").value.trim();

            let errores = [];

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

            // Obtener nombre a partir del correo
            let nombre = correo.split("@")[0];

            let datos = new FormData();

            datos.append("crear", true);
            datos.append("correo", correo);
            datos.append("password", password);
            datos.append("nombre", nombre);

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