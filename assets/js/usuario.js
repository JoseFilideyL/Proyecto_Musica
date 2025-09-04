function abrirModal(tipo) {
    const modalTitulo = document.getElementById('modalTitulo');
    const modalContenido = document.getElementById('modalContenido');

     modalTitulo.textContent = tipo === 'login' ? 'Iniciar Sesión' : 'Registro';

    const formId = tipo === 'login' ? 'formLogin' : 'formRegistro';

    modalContenido.innerHTML = `
        <form id="${formId}">
        ${tipo === 'registro' ? `
            <div class="mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" name="nombre" required>
            </div>
            <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email" required>
            </div>
            ` : `
            <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="usuario" required>
            </div>`
        }
        <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" name="password" required>
        </div>
        <div id="mensajeError" class="text-danger mb-2"></div>
        <button type="submit" class="btn btn-${tipo === 'login' ? 'primary' : 'success'}">
            ${tipo === 'login' ? 'Entrar' : 'Registrarse'}
        </button>
        </form>`;

    const modal = new bootstrap.Modal(document.getElementById('usuarioModal'));
    modal.show();

    document.getElementById(formId).addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const errorDiv = document.getElementById('mensajeError');
    errorDiv.textContent = '';

    const password = form.password.value.trim();

    if (tipo === 'login') {
        const email = form.usuario.value.trim();
        if (!email || !password) {
        errorDiv.textContent = 'Por favor completa todos los campos.';
            return;
        }

        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
        if (!usuarioGuardado || email !== usuarioGuardado.email || password !== usuarioGuardado.password) {
            errorDiv.textContent = 'Email o contraseña incorrectos.';
            return;
        }

        alert('Inicio de sesión exitoso (simulado)');
        modal.hide();

    } else {
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();

        if (!nombre || !email || !password) {
            errorDiv.textContent = 'Todos los campos son obligatorios.';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            errorDiv.textContent = 'El email no es válido.';
            return;
        }
        if (password.length < 8) {
            errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            return;
        }

        localStorage.setItem('usuario', JSON.stringify({
            nombre,
            email,
            password
        }));

        alert('Registro exitoso (simulado)');
        modal.hide();
        }
    });
}
