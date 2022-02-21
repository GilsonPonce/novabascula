const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { ipcRenderer } = require('electron');


const input_peso = document.getElementById('input_peso');
const select_tipo_peso = document.getElementById('select_tipo_peso');
const form_entrada = document.getElementById('form_entrada');
const form_salida = document.getElementById('form_salida');
const boton_buscar_ticket = document.getElementById('boton_buscarticket_salida');
const p_numero_ticket = document.getElementById('p_numero_ticket');

const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
},
    function (err) {
        if (err) {
            return console.log('Error: ', err.message)
        }
    });

const parser = port.pipe(new ReadlineParser());

parser.on('data', function (data) {
    document.getElementById('input_peso').value = data;
});

boton_buscar_ticket.addEventListener('click',mostrarticket);
select_tipo_peso.addEventListener('change',cambiarform);

function cambiarform(e) {
    if(select_tipo_peso.value == "1"){
        form_entrada.classList.add("d-none");
        form_salida.classList.remove("d-none");
    }else{
        form_entrada.classList.remove("d-none");
        form_salida.classList.add("d-none");
    }
}

function mostrarticket(e){
    //p_numero_ticket.innerText = filePat
    ipcRenderer.send('openTicket'); 
    ipcRenderer.send('hideMain');
}

ipcRenderer.on('pasoinfo',(event,arg)=>{
    p_numero_ticket.innerHTML = arg.ticket;
});




