const { ipcRenderer} = require('electron');
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
const boton_registrar_salida = document.getElementById('boton_registrar_salida');
const boton_registrar_entrada = document.getElementById('boton_registrar_entrada');
const p_numero_ticket = document.getElementById('p_numero_ticket');
const p_placa_ticket = document.getElementById('p_placa_ticket');
const p_transportista_ticket = document.getElementById('p_transportista_ticket');
const p_proveedor_ticket = document.getElementById('p_proveedor_ticket');
const input_porcentaje_contaminacion = document.getElementById('input_porcentaje_contaminacion');
const select_linea = document.getElementById('select_linea');
const select_proceso = document.getElementById('select_proceso');
const select_material = document.getElementById('select_material');
const select_tipo_material = document.getElementById('select_tipo_material');
const select_contaminacion = document.getElementById('select_contaminacion');
const select_transportista = document.getElementById('select_transportista');
const select_vehiculo = document.getElementById('select_vehiculo');
const select_proveedor = document.getElementById('select_proveedor');
const select_forma_recepcion_entrada = document.getElementById('select_forma_recepcion_entrada');
const select_forma_recepcion_salida = document.getElementById('select_forma_recepcion_salida');
const input_peso_contaminacion = document.getElementById('input_peso_contaminacion');

let procesos;
let materiales;
let tipo_materiales;
let vehiculos;


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
                    input_peso.value = valor
                })
            } else {
                console.log(`PUERTO ${path} NO CUMPLE CON ESPECIFICACIONES`)
            }
        })
    });

function cambiarform(e) {
    if (select_tipo_peso.value == "SALIDA") {
        form_entrada.classList.add("d-none");
        form_salida.classList.remove("d-none");
    } else {
        form_entrada.classList.remove("d-none");
        form_salida.classList.add("d-none");
    }
}

boton_buscar_ticket.addEventListener('click', mostrarticket);
select_tipo_peso.addEventListener('change', cambiarform);
input_porcentaje_contaminacion.addEventListener('change',calcularpeso);
select_linea.addEventListener('change',cargaProcesos);
select_proceso.addEventListener('change',cargaMateriales);
select_material.addEventListener('change',cargarTipoMateriles);
select_transportista.addEventListener('change',cargarVehiculos);
boton_registrar_entrada.addEventListener('click',registrarPesoEntrada);
boton_registrar_salida.addEventListener('click',registrarPesoSalida);

function mostrarticket(e) {
    //p_numero_ticket.innerText = filePat
    ipcRenderer.send('openTicket');
    ipcRenderer.send('hideMain');
}

function calcularpeso(){
    input_peso_contaminacion.value = (Number(parseInt(input_peso.value)) * Number(parseInt(input_porcentaje_contaminacion.value)))/100 + 'Kg'
    // console.log('Valor balanza: ',Number(parseInt(input_peso.value)));
    // console.log('Valor porcentaje: ',Number(parseInt(input_porcentaje_contaminacion.value)));
    // console.log('Valor calculado: ',input_peso_contaminacion.value)
}


ipcRenderer.send('listarLineas');
ipcRenderer.send('listarProcesos');
ipcRenderer.send('listarMateriales');
ipcRenderer.send('listarTipoMateriales');
ipcRenderer.send('listarTipoContaminacion');
ipcRenderer.send('listarProveedores');
ipcRenderer.send('listarTransportistas');
ipcRenderer.send('listarVehiculos');
ipcRenderer.send('listarFormasRecepciones');

ipcRenderer.on('pasoinfo',(event,id) => {
    info(id)
});

function info(id){
    const result = ipcRenderer.send('getInfoTicket',id);
    console.log(result);
}

function registrarPesoEntrada(){
    const infoTicket = {
        procesado:0,
        id_vehiculo: parseInt(select_vehiculo.value),
        id_proveedor: parseInt(select_proveedor.value),
        id_empresa:1
    }
    const pesoEntrada = {
        tipo_peso: select_tipo_peso.value,
        forma_recepcion: select_forma_recepcion_entrada.value,
        peso: parseInt(input_peso.value)
    }
    if(infoTicket.id_vehiculo != 0 && infoTicket.id_proveedor != 0 && pesoEntrada.forma_recepcion != "" && pesoEntrada.peso != ""){
        ipcRenderer.send('registrarPesoEntrada',infoTicket,pesoEntrada)
    }else{
        ipcRenderer.send('showAlert','Datos incompletos');
    }
    // console.log(infoTicket);
    // console.log(pesoEntrada);
}

function registrarPesoSalida(){
    const pesoSalida = {
        id_ticket: parseInt(p_numero_ticket.innerHTML),
        tipo_peso: select_tipo_peso.value,
        id_tipo_material: paserInt(select_tipo_material.value),
        forma_recepcion: select_forma_recepcion_salida.value,
        peso: parseInt(input_peso.value),
        peso_contaminacion: parseFloat(input_peso_contaminacion),
        porcentaje_contaminacion: parseFloat(input_porcentaje_contaminacion)
    }
}

function cargaProcesos(){
    select_proceso.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    procesos.map(({id_linea,nombre,id_proceso})=>{
        if (select_linea.value == id_linea) html += `<option value="${id_proceso}">${nombre}</option>`    
    });
    select_proceso.innerHTML = html;
}

function cargaMateriales(){
    select_material.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    materiales.map(({id_proceso,nombre,id_material})=>{
        if (select_proceso.value == id_proceso) html += `<option value="${id_material}">${nombre}</option>`    
    });
    select_material.innerHTML = html;
}

function cargarTipoMateriles(){
    select_tipo_material.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    tipo_materiales.map(({id_tipo_material,nombre,id_material})=>{
        if (select_material.value == id_material) html += `<option value="${id_tipo_material}">${nombre}</option>`    
    });
    select_tipo_material.innerHTML = html;
}

function cargarVehiculos(){
    select_vehiculo.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    vehiculos.map(({id_vehiculo,id_transportista,placa})=>{
        if (id_transportista == select_transportista.value) html += `<option value="${id_vehiculo}">${placa}</option>`    
    });
    select_vehiculo.innerHTML = html;
}

ipcRenderer.on('lineas', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({id_linea,nombre})=>{
        html += `<option value="${id_linea}">${nombre}</option>`    
    });
    select_linea.innerHTML = html;
});

ipcRenderer.on('procesos', (event, arg) => {
    procesos = arg;
});

ipcRenderer.on('materiales', (event, arg) => {
    materiales = arg;
});

ipcRenderer.on('tipoMateriales', (event, arg) => {
    tipo_materiales = arg;
});

ipcRenderer.on('tipoContaminaciones', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({id_tipo_contaminacion,nombre})=>{
        html += `<option value="${id_tipo_contaminacion}">${nombre}</option>`    
    });
    select_contaminacion.innerHTML = html;
});
ipcRenderer.on('proveedores', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({id_proveedor,nombre})=>{
        html += `<option value="${id_proveedor}">${nombre}</option>`    
    });
    select_proveedor.innerHTML = html;
});

ipcRenderer.on('transportistas', (event, arg) => {
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({id_transportista,nombre})=>{
        html += `<option value="${id_transportista}">${nombre}</option>`    
    });
    select_transportista.innerHTML = html;
});

ipcRenderer.on('vehiculos', (event, arg) => {
    vehiculos = arg;
});

ipcRenderer.on('formasRecepciones', (event, arg) => {
    let cont = 0;
    let html = '<option value="0">Open this select menu</option>';
    arg.map(({id_forma_recepcion,nombre})=>{
        cont++;
        cont == 1 
        ? 
        html += `<option value="${nombre}" selected>${nombre}</option>` 
        :
        html += `<option value="${nombre}">${nombre}</option>`;
    });
    select_forma_recepcion_entrada.innerHTML = html;
    select_forma_recepcion_salida.innerHTML = html;
});

ipcRenderer.on('ticket',(event,arg) =>{

})





