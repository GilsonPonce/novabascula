const { ipcRenderer } = require('electron');

const boton_login = document.getElementById('boton_ingresar_login');
const input_cedula = document.getElementById('input_cedula_login');
const input_usuario = document.getElementById('input_usuario_login');
const input_contrasena = document.getElementById('input_password_login');

boton_login.addEventListener('click', ingresar);
input_cedula.addEventListener('keyup', function(e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
      input_usuario.focus();
    }
  });

input_usuario.addEventListener('keyup', function(e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
      input_contrasena.focus();
    }
  });

input_contrasena.addEventListener('keyup', function(e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
      ingresar();
    }
  });

function ingresar() {
    // let cedula = input_cedula.value;
    // let usuario = input_usuario.value;
    // let contrasena = input_contrasena.value;
    // if (cedula != '' && usuario != '' && contrasena != '') {
        // let objectCredenciales = {
        //     cedula,
        //     usuario,
        //     contrasena
        // }
        let objectCredenciales = {}
        ipcRenderer.send('login', objectCredenciales);
        input_cedula.value = '';
        input_usuario.value = '';
        input_contrasena.value = '';
    // } else {
    //     ipcRenderer.send('showAlert','Llene los campos requeridos');
    // }

}