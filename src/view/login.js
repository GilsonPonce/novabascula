const { ipcRenderer } = require('electron');

const boton_login = document.getElementById('boton_ingresar_login');

boton_login.addEventListener('click',ingresar);

function ingresar(){
    ipcRenderer.send('openMain');
}