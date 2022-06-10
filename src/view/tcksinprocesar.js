const { ipcRenderer } = require('electron');
const { getTicketSinProcesar } = require('../database');


const body_table = document.getElementById('body_table');
const boton_volver = document.getElementById('boton_volver');


boton_volver.addEventListener('click', mostrarVentanaPesaje);

llenarTabla();
function llenarTabla() {
    getTicketSinProcesar().then((data) => {
        let html = ""
        data.map(({ id_ticket, placa, fecha_ticket, proveedor, transportista }) => {
            html += `<tr ondblclick="enviarticket(${id_ticket})">
                      <th scope="row">${id_ticket}</th>
                      <td>${("0"+fecha_ticket.getDate()).slice(-2) + "/" + ("0"+(fecha_ticket.getMonth() + 1 )).slice(-2) + "/" + fecha_ticket.getFullYear() + " - " + ("0"+(fecha_ticket.getHours()-2)).slice(-2) + ":" + ("0"+fecha_ticket.getMinutes()).slice(-2) + ":" + ("0"+fecha_ticket.getSeconds()).slice(-2)}</td>
                      <td>${placa}</td>
                      <td>${transportista}</td>
                      <td>${proveedor}</td>
                    </tr>`
        });
        body_table.innerHTML = html;
    }).catch( (mensaje) => {
        ipcRenderer.send('showAlert', 'error', mensaje)
        mostrarVentanaPesaje();
    })
}


function enviarticket(id) {
    ipcRenderer.invoke('info', id);
    ipcRenderer.send('closeTicket');
    
}

function mostrarVentanaPesaje() {
    ipcRenderer.send('showMain');
    ipcRenderer.send('closeTicket');
}

