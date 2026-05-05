document.addEventListener('DOMContentLoaded', function () {

    

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