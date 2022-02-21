const { ipcRenderer } = require('electron');

const fila = document.getElementById('fila1');

fila.addEventListener('dblclick',enviarticket);

function enviarticket(e){
    let data = {
        ticket: "35986"
    };
    ipcRenderer.send('info',data);
    ipcRenderer.send('closeTicket');
    ipcRenderer.send('showMain');
}

