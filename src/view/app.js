const { ipcRenderer } = require('electron');
const { SerialPort } = require('serialport')
const { RegexParser } = require('@serialport/parser-regex');
const { getConnection } = require('../database');
const Alert = require('electron-alert');

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
const boton_contaminacion = document.getElementById('boton_contaminacion');
const boton_setting = document.getElementById('boton_setting');
const p_numero_ticket = document.getElementById('p_numero_ticket');
const p_placa_ticket = document.getElementById('p_placa_ticket');
const p_transportista_ticket = document.getElementById('p_transportista_ticket');
const p_proveedor_ticket = document.getElementById('p_proveedor_ticket');
const p_entrada_ticket = document.getElementById('p_entrada_ticket');
const p_neto_ticket = document.getElementById('p_neto_ticket');
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
const lista_contaminacion = document.getElementById('lista_contaminacion');
const textarea_observacion = document.getElementById("textarea_observacion");
const boton_refrest = document.getElementById("boton_refrest");
let procesos;
let materiales;
let tipo_materiales;
let vehiculos;
let pesoNeto;
let idContaminaciones = [];
let contaminaciones = [];



//LISTAR PUERTOS
SerialPort.list()
    .then((ports) => {
        // LISTA DE PUERTOS
        //console.log(ports)
        if (ports.length == 0) console.log("No hay puertos disponibles")
        ports.forEach(({ manufacturer, path, productId }) => {
            if (manufacturer == manufacture || productId == IdProduct) {
                console.log(`PUERTO ${path} CUMPLE CON ESPECIFICACIONES`)
                const port1 = new SerialPort({ path: path, baudRate: 9600 }, (err) => {
                    if (err) {
                        ipcRenderer.send('showAlert', err.message + 'Esta siendo usado por otro proceso');
                        return console.log('Error: ', err.message, ' Esta siendo usado por otro proceso')
                    }
                })
                const parser = port1.pipe(new RegexParser({ regex: /[\r\n]+/ }))//
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


boton_refrest.addEventListener('click', () => {
    ipcRenderer.send("listarLineas");
    ipcRenderer.send("listarMateriales");
    ipcRenderer.send("listarTipoMateriales");
    ipcRenderer.send("listarProveedores");
    ipcRenderer.send("listarTransportistas");
    ipcRenderer.send("listarProcesos");
    ipcRenderer.send("listarTipoContaminacion");
    ipcRenderer.send("listarFormasRecepciones");
    ipcRenderer.send("listarVehiculos");
})

select_linea.addEventListener('change',()=>{
    select_material.setAttribute('disabled','')
    select_tipo_material.setAttribute('disabled','')
    if(select_linea.value == "1"){
        textarea_observacion.value = "DESCUENTO POR CONFIRMAR"
    }else{
        textarea_observacion.value = ""
    }
})

select_proceso.addEventListener('change',()=>{
    select_tipo_material.setAttribute('disabled','')
})

input_peso.addEventListener('change',()=>{
    calcularpeso();
})

function limpiar(){
    pesoNeto = 0;
    p_numero_ticket.innerHTML = "";
    p_placa_ticket.innerHTML = "";
    p_transportista_ticket.innerHTML = "";
    p_proveedor_ticket.innerHTML = "";
    p_entrada_ticket.innerHTML = "";
    p_neto_ticket.innerHTML = "";
    input_peso_contaminacion.value = "";
    input_porcentaje_contaminacion.value = "";
    textarea_observacion.value = "";
    select_proceso.innerHTML = "";
    select_material.innerHTML = "";
    select_tipo_material.innerHTML = "";
    select_proceso.setAttribute("disabled","")
    select_material.setAttribute("disabled","")
    select_tipo_material.setAttribute("disabled","")
    idContaminaciones = []
    contaminaciones = []
    ipcRenderer.send("listarLineas");
    ipcRenderer.send("listarMateriales");
    ipcRenderer.send("listarTipoMateriales");
    ipcRenderer.send("listarProveedores");
    ipcRenderer.send("listarTransportistas");
    ipcRenderer.send("listarProcesos");
    ipcRenderer.send("listarTipoContaminacion");
    ipcRenderer.send("listarFormasRecepciones");
    ipcRenderer.send("listarVehiculos");
    listarContaminaciones();
}

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
input_porcentaje_contaminacion.addEventListener('change', calcularpeso);
select_linea.addEventListener('change', cargaProcesos);
select_proceso.addEventListener('change', cargaMateriales);
select_material.addEventListener('change', cargarTipoMateriles);
select_transportista.addEventListener('change', cargarVehiculos);
boton_registrar_entrada.addEventListener('click', registrarPesoEntrada);
boton_registrar_salida.addEventListener('click', registrarPesoSalida);
boton_contaminacion.addEventListener('click', addIdContaminacion);
boton_setting.addEventListener('click', () => {
    ipcRenderer.send('openAdmin')
});

function mostrarticket(e) {
    //p_numero_ticket.innerText = filePat
    ipcRenderer.send('openTicket');
    ipcRenderer.send('hideMain');
}

function calcularpeso() {
    input_peso_contaminacion.value = Math.abs((Number(parseFloat(pesoNeto == "" ? 0 : pesoNeto)) * Number(parseFloat(input_porcentaje_contaminacion.value == "" ? 0 : input_porcentaje_contaminacion.value))) / 100)
    p_neto_ticket.innerHTML = Math.abs(parseFloat(pesoNeto == "" ? 0 : pesoNeto) - parseFloat(isNaN(input_peso_contaminacion.value) ? 0 : input_peso_contaminacion.value))
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

ipcRenderer.on('pasoinfo', (event, id) => {
    info(id)
});

function info(id) {
    getInfoTicket(id)
    getPesoUltimoTicket(id)
}

function registrarPesoEntrada() {
    const infoTicket = {
        procesado: 0,
        id_vehiculo: parseInt(select_vehiculo.value),
        id_proveedor: parseInt(select_proveedor.value),
        id_empresa: 1
    }
    const pesoEntrada = {
        tipo_peso: select_tipo_peso.value,
        forma_recepcion: select_forma_recepcion_entrada.value,
        peso: parseInt(input_peso.value)
    }
    if (infoTicket.id_vehiculo != 0
        && !isNaN(infoTicket.id_vehiculo)
        && infoTicket.id_proveedor != 0
        && !isNaN(infoTicket.id_proveedor)
        && pesoEntrada.forma_recepcion != ""
        && pesoEntrada.peso != "") {
        limpiar();
        ipcRenderer.send('registrarPesoEntrada', infoTicket, pesoEntrada)
    } else {
        ipcRenderer.send('showAlert', 'warning', 'Datos incompletos');
    }
}

function registrarPesoSalida() {
    let peso_pagar = 0
    let peso_pagar_sindes = Math.abs(parseFloat(p_entrada_ticket.innerHTML) - parseFloat(input_peso.value))
    let peso_des = 0

    if(!isNaN(parseInt(input_peso_contaminacion.value)) && !isNaN(parseInt(input_porcentaje_contaminacion.value)) && parseInt(input_peso_contaminacion.value) != 0){
        peso_des = (peso_pagar_sindes * parseFloat(input_porcentaje_contaminacion.value))/100
        peso_pagar = Math.abs((parseFloat(peso_pagar_sindes) - parseFloat(peso_des)))
    }else{
        peso_pagar = peso_pagar_sindes
    }

    const pesoSalida = {
        id_ticket: parseInt(p_numero_ticket.innerHTML),
        tipo_peso: select_tipo_peso.value,
        id_tipo_material: parseInt(select_tipo_material.value),
        forma_recepcion: select_forma_recepcion_salida.value,
        peso: parseFloat(input_peso.value),
        peso_contaminacion: parseFloat(input_peso_contaminacion.value),
        porcentaje_contaminacion: parseFloat(input_porcentaje_contaminacion.value),
        peso_total: peso_pagar
    }
    if (
        !isNaN(Number(pesoSalida.id_ticket)) &&
        pesoSalida.tipo_peso != "" &&
        !isNaN(Number(pesoSalida.id_tipo_material)) &&
        pesoSalida.forma_recepcion != "" &&
        !isNaN(Number(pesoSalida.peso)) &&
        !isNaN(Number(pesoSalida.peso_total))
    ) {
        calcularpeso();
        if (isNaN(pesoSalida.peso_contaminacion)) pesoSalida.peso_contaminacion = 0
        if (isNaN(pesoSalida.porcentaje_contaminacion)) pesoSalida.porcentaje_contaminacion = 0
        if (pesoSalida.peso_contaminacion > 0 && pesoSalida.porcentaje_contaminacion > 0 && contaminaciones.length == 0) {
            ipcRenderer.send('showAlert', 'warning', 'Falta elejir los tipo de contaminacion')
            select_contaminacion.focus()
        } else if (pesoSalida.peso_contaminacion == 0 && pesoSalida.porcentaje_contaminacion == 0 && contaminaciones.length > 0) {
            ipcRenderer.send('showAlert', 'warning', 'Falta poner el porcentaje de contaminacion')
            input_porcentaje_contaminacion.focus();
        } else {
            calcularpeso();
            registrarSalida(pesoSalida);
        }
    } else {
        ipcRenderer.send('showAlert', 'warning', 'Faltan campos por llenar')
    }

}

function cargaProcesos() {
    select_proceso.innerHTML = "";
    select_proceso.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    procesos.map(({ id_linea, nombre, id_proceso }) => {
        if (select_linea.value == id_linea) html += `<option value="${id_proceso}">${nombre}</option>`
    });
    select_proceso.innerHTML = html;
}

function cargaMateriales() {
    select_material.innerHTML = "";
    select_material.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    materiales.map(({ id_proceso, nombre, id_material }) => {
        if (select_proceso.value == id_proceso) html += `<option value="${id_material}">${nombre}</option>`
    });
    select_material.innerHTML = html;
}

function cargarTipoMateriles() {
    select_tipo_material.innerHTML = "";
    select_tipo_material.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    tipo_materiales.map(({ id_tipo_material, nombre, id_material }) => {
        if (select_material.value == id_material) html += `<option value="${id_tipo_material}">${nombre}</option>`
    });
    select_tipo_material.innerHTML = html;
}

function cargarVehiculos() {
    select_vehiculo.innerHTML = "";
    select_vehiculo.removeAttribute("disabled");
    let html = '<option value="0" selected>Open this select menu</option>';
    vehiculos.map(({ id_vehiculo, id_transportista, placa }) => {
        if (id_transportista == select_transportista.value) html += `<option value="${id_vehiculo}">${placa}</option>`
    });
    select_vehiculo.innerHTML = html;
}

ipcRenderer.on('lineas', (event, arg) => {
    select_linea.innerHTML = "";
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({ id_linea, nombre }) => {
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
    select_contaminacion.innerHTML = "";
    let html = '';
    arg.map(({ id_tipo_contaminacion, nombre }) => {
        html += `<option value="${id_tipo_contaminacion}_${nombre}">${nombre}</option>`
    });
    select_contaminacion.innerHTML = html;
});
ipcRenderer.on('proveedores', (event, arg) => {
    select_proveedor.innerHTML = "";
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({ id_proveedor, nombre }) => {
        html += `<option value="${id_proveedor}">${nombre}</option>`
    });
    select_proveedor.innerHTML = html;
});

ipcRenderer.on('transportistas', (event, arg) => {
    select_vehiculo.innerHTML = "";
    select_vehiculo.setAttribute("disabled","");
    select_transportista.innerHTML = "";
    let html = '<option value="0" selected>Open this select menu</option>';
    arg.map(({ id_transportista, nombre }) => {
        html += `<option value="${id_transportista}">${nombre}</option>`
    });
    select_transportista.innerHTML = html;
});

ipcRenderer.on('vehiculos', (event, arg) => {
    vehiculos = arg;
});

ipcRenderer.on('formasRecepciones', (event, arg) => {
    select_forma_recepcion_entrada.innerHTML = "";
    select_forma_recepcion_salida.innerHTML = "";
    let cont = 0;
    let html = '<option value="">Open this select menu</option>';
    arg.map(({ id_forma_recepcion, nombre }) => {
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

function getInfoTicket(id) {
    $query = `
    select
    tic.id_ticket, tic.observaciones ,tic.fecha_ticket, veh.placa , pro.nombre as proveedor, tran.nombre as transportista
    from 
    (select prov.id_proveedor, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona ) pro,
    (select trans.id_transportista, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
    ticket tic, vehiculo veh
    where veh.id_vehiculo = tic.id_vehiculo and pro.id_proveedor = tic.id_proveedor and tran.id_transportista = veh.id_transportista and tic.procesado = 0 and tic.id_ticket =` + getConnection().escape(id)

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay tickets');
            return;
        }

        rows.map((ticket) => {
            textarea_observacion.value = ticket.observaciones
            p_numero_ticket.innerHTML = ticket.id_ticket;
            p_placa_ticket.innerHTML = ticket.placa;
            p_proveedor_ticket.innerHTML = ticket.proveedor;
            p_transportista_ticket.innerHTML = ticket.transportista;

        });
    });
}


function getPesoUltimoTicket(id) {

    let sqlmaxid = `select max(pe.id_peso) as id from peso pe, ticket tic where tic.id_ticket = pe.id_ticket and tic.id_ticket =` + getConnection().escape(id)

    getConnection().query(sqlmaxid, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay tickets');
            return;
        }
        let query = `
        select
        pe.peso, pe.peso_contaminacion, pe.peso_total, pe.tipo_peso
        from peso pe
        where pe.id_peso = ${rows[0].id}`
        getConnection().query(query, function (err, rows1, fields) {
            if (err) ipcRenderer('showAlert', 'error', err.message)
            rows1.map(({ peso }) => {
                pesoNeto = Math.abs(parseInt(peso) - parseInt(input_peso.value));
                p_entrada_ticket.innerHTML = peso;
                p_neto_ticket.innerHTML = Math.abs(parseInt(peso) - parseInt(input_peso.value));
                calcularpeso();
            });
        })
    });
}

function registrarSalida(objeto) {
    let sqlpeso = `insert into peso set ?`
    getConnection().query(sqlpeso, objeto, function (err, result) {
        if (err) ipcRenderer.send('showAlert', 'error', err.message);
        registrarContaminacion(result.insertId);
        let query = `update ticket set observaciones = ? where id_ticket = ?`
        let objetoticket = {
            observaciones: textarea_observacion.value == "" ? null : textarea_observacion.value,
            id_ticket: Number(objeto.id_ticket)
        }
        new Promise((resolve, reject) => {
            getConnection().query(query, Object.values(objetoticket), function (err, result) {
                if (err) reject(err.message)
                resolve(result.affectedRows)
            });
        }).then((filas) => {
            if (filas > 0) {
               limpiar();
                ipcRenderer.send('showAlertPregunta', objeto.id_ticket)
                //location.reload();
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', 'error', msm.toString());
        })
    })
}

function addIdContaminacion() {
    let array = select_contaminacion.value.split('_')//['1','nombre']
    if (idContaminaciones.indexOf(parseInt(array[0])) == -1) {
        idContaminaciones.push(parseInt(array[0]))
        contaminaciones.push({
            id_contaminacion: parseInt(array[0]),
            nombre: array[1]
        })
    }
    listarContaminaciones();
}

function deleteContaminacion(id) {
    let pos = idContaminaciones.indexOf(parseInt(id))
    if (pos > -1) {
        idContaminaciones = idContaminaciones.filter((item) => { return item != parseInt(id) })
        contaminaciones = contaminaciones.filter((item) => { return item.id_contaminacion != parseInt(id) })
    }
    listarContaminaciones();
}

function listarContaminaciones() {
    let html = ``;
    contaminaciones.map(({ id_contaminacion, nombre }) => {
        html += `<button type="button" class="btn btn-info me-2" onclick="deleteContaminacion(${id_contaminacion})">
        ${nombre} <span class="badge bg-danger">-</span>
      </button>`
    });
    lista_contaminacion.innerHTML = html;
}

function registrarContaminacion(id_peso) {
    if (contaminaciones.length > 0) {
        let arraydata = []
        let sql = "insert into contaminacion (id_tipo_contaminacion,id_peso) values ?"
        contaminaciones.map(({ id_contaminacion }) => {
            arraydata.push([parseInt(id_contaminacion), parseInt(id_peso)])
        })
        getConnection().query(sql, [arraydata], function (err, result) {
            if (err) ipcRenderer.send('showAlert', 'error', err.message);
        });
    }
}

