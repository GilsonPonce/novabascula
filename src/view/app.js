const { ipcRenderer } = require('electron');
const { SerialPort } = require('serialport')
const { RegexParser } = require('@serialport/parser-regex')
//ESPECIFICACINES DE BALANZA
const manufacture = 'Prolific'
const IdProduct = '2303'

const input_peso = document.getElementById('input_peso');
const select_tipo_peso = document.getElementById('select_tipo_peso');
const form_entrada = document.getElementById('form_entrada');
const form_salida = document.getElementById('form_salida');
const boton_buscar_ticket = document.getElementById('boton_buscarticket_salida');
const p_numero_ticket = document.getElementById('p_numero_ticket');

let datos = {};
//LISTAR PUERTOS
SerialPort.list()
    .then((ports) => {
        // LISTA DE PUERTOS
        //console.log(ports)
        if (ports.length == 0) ipcRenderer.send('showAlert', 'No hay puertos disponibles');
        ports.forEach(({ manufacturer, path, productId }) => {
            if (manufacturer == manufacture || productId == IdProduct) {
                console.log(`PUERTO ${path} CUMPLE CON ESPECIFICACIONES`)
                const port1 = new SerialPort({ path: path, baudRate: 9600 }, (err) => {
                    if (err) {
                        ipcRenderer.send('showAlert', err.message + 'Esta siendo usado por otro proceso');
                        return console.log('Error: ', err.message, ' Esta siendo usado por otro proceso')
                    }
                })
                const parser = port1.pipe(new RegexParser({ regex: /[\r\n]+/ }))
                parser.on('data', (data) => {
                    let valor = data.substring(5, 11)//seis digitos 000000
                    valor = Number(valor)//elimina ceros a la derecha
                    document.getElementById('input_peso').value = valor
                })
            } else {
                console.log(`PUERTO ${path} NO CUMPLE CON ESPECIFICACIONES`)
            }
        })
    });

function cambiarform(e) {
    if (select_tipo_peso.value == "1") {
        form_entrada.classList.add("d-none");
        form_salida.classList.remove("d-none");
    } else {
        form_entrada.classList.remove("d-none");
        form_salida.classList.add("d-none");
    }
}

boton_buscar_ticket.addEventListener('click', mostrarticket);
select_tipo_peso.addEventListener('change', cambiarform);
function mostrarticket(e) {
    //p_numero_ticket.innerText = filePat
    ipcRenderer.send('openTicket');
    ipcRenderer.send('hideMain');
}

ipcRenderer.send('listarLineas');
ipcRenderer.send('listarProcesos');
ipcRenderer.send('listarMateriales');
ipcRenderer.send('listarTipoMateriales');
ipcRenderer.send('listarTipoContaminacion');
ipcRenderer.send('listarProveedores');
ipcRenderer.send('listarTransportistas');
ipcRenderer.send('listarVehiculos');

ipcRenderer.on('pasoinfo', (event, arg) => {
    p_numero_ticket.innerHTML = arg.ticket;
});

ipcRenderer.on('lineas', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({id_linea,nombre})=>{
        html += `<option value="${id_linea}">${nombre}</option>`    
    });
    document.getElementById('select_linea').innerHTML = html;
});

ipcRenderer.on('procesos', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    
    arg.map(({id_linea,nombre})=>{
        html += `<option value="${id_linea}">${nombre}</option>`    
    });
    document.getElementById('select_linea').innerHTML = html;
});
ipcRenderer.on('materiales', (event, arg) => {
    console.log(arg);
});
ipcRenderer.on('tipoMateriales', (event, arg) => {
    console.log(arg);
});
ipcRenderer.on('tipoContaminaciones', (event, arg) => {
    console.log(arg);
});
ipcRenderer.on('proveedores', (event, arg) => {
    console.log(arg);
});
ipcRenderer.on('transportistas', (event, arg) => {
    console.log(arg);
});





