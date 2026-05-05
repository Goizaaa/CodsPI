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


    

    abredospasos.addEventListener("click", (event) => {
        event.preventDefault();
        recuperar.style.display = "none";
        inicio.style.display = "none";
        restablecer.style.display = "none";
        dospasos.style.display = "block";
        crear.style.display = "none";
    });







    const $form = document.getElementById('registro');
    const $email = document.getElementById('correo');
    const $password = document.getElementById('contra');
    const $messages = $form.querySelector('.mensaje');
    

    $form.addEventListener('submit', function (event) {
        event.preventDefault();

        let email = $email.value.trim();
        let password = $password.value.trim();
        let errors = [];

        // Validación email
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $email.classList.remove('error');
        } else {
            errors.push('El email no es válido.<br>');
            $email.classList.add('error');
        }


        if (password.length >= 4) {
            $password.classList.remove('error');
        } else {
            errors.push('La contraseña debe tener al menos 4 caracteres.<br>');
            $password.classList.add('error');
        }


        if (errors.length > 0) {
            $messages.innerHTML = errors.join('');
            $messages.classList.add('show');
        } else {
            $messages.classList.remove('show');
            $form.submit();
        }
    });
});