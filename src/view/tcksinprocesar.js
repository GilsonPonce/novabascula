const { ipcRenderer } = require('electron');
const moment = require('moment');

//const fila = document.getElementById('fila1');
const body_table = document.getElementById('body_table');
const boton_volver = document.getElementById('boton_volver');

//fila.addEventListener('dblclick',enviarticket);
boton_volver.addEventListener('click',mostrarVentanaPesaje);

ipcRenderer.send('listarTicketSinProcesar');

ipcRenderer.on('ticketSinProcesar',(event,arg)=>{

    let html = ""
    arg.map(({id_ticket,placa,fecha_ticket,proveedor,transportista})=>{
        html += `<tr ondblclick="enviarticket(${id_ticket})">
              <th scope="row">${id_ticket}</th>
              <td>${fecha_ticket.getDate()+"/"+fecha_ticket.getMonth()+"/"+fecha_ticket.getFullYear()+" - "+fecha_ticket.getHours()+":"+fecha_ticket.getMinutes()+":"+fecha_ticket.getSeconds()}</td>
              <td>${placa}</td>
              <td>${transportista}</td>
              <td>${proveedor}</td>
            </tr>`
    });
    body_table.innerHTML = html;
})

function enviarticket(id){
    ipcRenderer.invoke('info',id);
    ipcRenderer.send('closeTicket');
    ipcRenderer.send('showMain');
}

function mostrarVentanaPesaje(){
    ipcRenderer.send('showMain');
    ipcRenderer.send('closeTicket');
}

