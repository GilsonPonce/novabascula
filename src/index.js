const { app, ipcMain, BrowserWindow, ipcRenderer } = require('electron')
const Alert = require("electron-alert");
const fs = require("fs")
const { getConnection, infoticket, infopesos, infocontaminacion } = require('./database.js')
const path = require('path');
const url = require('url');
const moment = require('moment');
const pdf = require('html-pdf');
const { print } = require('pdf-to-printer');
let window;
let windowtickets;
let windowlogin;
let windowticketpdf;
let lineas;
let procesos;
let materiales;
let tipo_materiales;
let tipo_contaminaciones;
let vehiculos;
let transportistas;
let proveedores;
let ticketsinprocesar;
let formarecepcion;
const incremento = 100 / 7;

function alerta(icon = 'warning', text) {
    let alert = new Alert();

    let swalOptions = {
        title: "Aviso",
        text,
        icon,
        showCancelButton: false
    };

    alert.fireFrameless(swalOptions, null, true, false);
}

function infoImpresion(id) {
    let conteoSalida = 0;
    procesarTicket(id);
    let salidaconta = [];
    let contaminacion = [];
    let html = ``;
    infoticket(id)
        .then((info_ticket) => {
            return infopesos(id, info_ticket)
        }).then(({ infoticket, pesos }) => {
            let tipo_ticket = ""
            pesos.map((item) => {
                if (item.tipo_peso == "SALIDA") {
                    tipo_ticket = item.linea + "-" + item.material;
                    return;
                }
            });
            html += `<!DOCTYPE html>
                <html lang="en">
            
                <head>
                    <meta charset="utf-8">
                    <title>PDF Result Template</title>
                    <title>Document</title>
                    <style>
                        body{
                            font-size: 10px;
                        }
                        .border {
                            border: solid 1px #2c2c2c;
                            padding: 5px;
                            margin-top: 3px;
                        }
                        .table_info{
                            width: 100%;
                            text-align: left;
                        }
                        .table_data{
                            width: 100%;
                            margin-top: 3px;
                            border-collapse: collapse;
                        }
                       .td{
                            border: 1px solid #2c2c2c;
                            border-collapse: collapse;
                            padding: 3px;
                       }
                        .th{
                            border: 1px solid #2c2c2c;
                            border-collapse: collapse;
                            padding: 3px;
                        }
                        .imagen{
                            display: inline;
                            width: 200px;
                        }
                        .d-block{
                            height: 100px;
                            display: inline;
                        }
                        .text-right{
                            text-align: right;
                        }
                        .w{
                            width: 550px;
                        }
                    </style>
                </head>
            
                <body>
                    <div class="container">
                        <div class="border">
                            <table>
                                <tr>
                                    <td class="w"> <img src="https://novared.com.ec/wp-content/uploads/2021/03/logo-novared.png" class="imagen"></td>
                                    <th class="text-right"><p class="d-block">NOVARED - NEGOCIOS Y RECICLAJE S.A. <br> <br> RUC# 0992968079001</p></th>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table class="table_info border">
                                <tr>
                                    <th ><b>Nro Ticket</b></th>
                                    <td >${infoticket.id_ticket}</td>
                                    <th >Fecha Ticket</th>
                                    <td >${infoticket.fecha_procesado == null ? "NO PROCESADO" : infoticket.fecha_procesado.getDate() + "/" + infoticket.fecha_procesado.getMonth() + "/" + infoticket.fecha_procesado.getFullYear() + " - " + infoticket.fecha_procesado.getHours() + ":" + infoticket.fecha_procesado.getMinutes() + ":" + infoticket.fecha_procesado.getSeconds()}</td>
                                    <th >Tipo Ticket</th>
                                    <td >${tipo_ticket}</td>
                                </tr>
                                <tr>
                                    <th>Placa</th>
                                    <td>${infoticket.placa}</td>
                                    <th>Transportista</th>
                                    <td>${infoticket.transportista}</td>
                                    <th>Cedula Transportista</th>
                                    <td>${infoticket.cedula}</td>
                                </tr>
                                <tr>
                                    <th class="">Proveedor/Cliente</th>
                                    <td class="">${infoticket.proveedor}</td>
                                </tr>
                            </table>
                        </div>
                        <table class="table_data">
            
                                <tr>
                                    <th class="th">TIPO PESO</th>
                                    <th class="th">MATERIAL</th>
                                    <th class="th">PESO</th>
                                    <th class="th">PESO CONTAMINACION</th>
                                    <th class="th">%</th>
                                    <th class="th">PESO A PAGAR</th>
                                    <th class="th">FECHA</th>
                                    <th class="th">FORMA RECEPCION</th>
                                </tr>`

            pesos.map(({ id_peso, peso, peso_contaminacion, porcentaje_contaminacion, peso_total, tipo_peso, forma_recepcion, fecha_hora, proceso, material, tipomaterial }) => {
                tipo_peso == "SALIDA" && conteoSalida++;
                if (peso_contaminacion != null && peso_contaminacion != 0) {
                    salidaconta.push(parseInt(conteoSalida))
                    contaminacion.push(parseInt(id_peso))
                }
                html += `<tr>
                        <th class="th">${tipo_peso == "SALIDA" ? "SALIDA " + conteoSalida : tipo_peso}</th>
                        <td class="td">${proceso == null ? "" : proceso  + " " + material == null ? "" : material + " " + tipomaterial == null ? "" : tipomaterial}</td>
                        <td class="td">${peso == null ? 0 : peso}</td>
                        <td class="td">${peso_contaminacion == null ? 0 : peso_contaminacion}</td>
                        <td class="td">${porcentaje_contaminacion == null ? 0 : porcentaje_contaminacion}</td>
                        <td class="td">${peso_total == null ? 0 : peso_total}</td>
                        <td class="td">${fecha_hora.getDate() + "/" + fecha_hora.getMonth() + "/" + fecha_hora.getFullYear() + " - " + fecha_hora.getHours() + ":" + fecha_hora.getMinutes() + ":" + fecha_hora.getSeconds()}</td>
                        <td class="td">${forma_recepcion}</td>
                        </tr>`

            })
            html += ` </table>`
            return infocontaminacion(id);
        }).then((NombreContaminacion) => {
            if (contaminacion.length > 0) {
                html += `<table class="table_data">`
                for (i in contaminacion) {
                    let conta = NombreContaminacion.filter(({ id_peso }) => { return id_peso == contaminacion[i] })
                    console.log("ARRAY DE CONTAMINACION", conta)
                    if (conta.length > 0) {
                        let detalle = ""
                        conta.map(({ nombre }) => {
                            detalle += `${nombre}, `
                        })
                        html += `<tr>
                    <th class="th">DETALLE DE CONTAMINACION SALIDA ${salidaconta[i]}</th>
                    <td class="td">${detalle}</td>
                    </tr>`
                    }
                }
                html += `  </table>`
            }
            html += `</div> </body> </html>`
            let options = { format: 'A5', orientation: "landscape" }
            let nombre = "./" + id + ".pdf"
            let urlarchivo = "";
            pdf.create(html, options).toFile(nombre, (err, res) => {
                if (err) alerta('error', err.message);
                if (res) {
                    urlarchivo = res.filename;
                    print(res.filename, {
                        monochrome: true,
                        paperSize: "A5",
                        copies: 1
                    }).then(() => {
                        fs.unlink(urlarchivo, (err) => {
                            if (err) alerta("error", err.message)
                            if (!err) console.log("ELiminacion exitosa")
                        })
                        console.log('Print ticket');
                         BrowserWindow.getFocusedWindow().reload()
                    })
                }
            });
        });
}

function alertaPregunta(id) {
    let alert = new Alert();

    let swalOptions = {
        title: "Quieres terminar e/i imprimir el ticket?",
        icon: "warning",
        showCancelButton: true
    };

    let promise = alert.fireWithFrame(swalOptions, "Terminar ticket?", null, false);
    promise.then((result) => {
        if (result.value) {
            infoImpresion(id)
        } else if (result.dismiss === Alert.DismissReason.cancel) {
            window.reload();
        }
    })
}

function login({ cedula, usuario, contrasena }) {

    $query = 'SELECT cre.user, cre.password_user from persona per inner join credencial cre on per.id_persona = cre.id_persona where per.cedula = ' + getConnection().escape(cedula) + ' and cre.estado = 1 and per.activo = 1';

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            alerta('warning', 'Usuario no existe');
            return;
        }

        let { user, password_user } = rows[0];

        if (
            user == usuario && password_user == contrasena
        ) {
            getLinea();
            getProceso();
            getMaterial();
            getTipoMaterial();
            getTipoContaminacion();
            getProveedor();
            getTransportista();
            getVehiculo();
            getTicketSinProcesar();
            getFormasRecepcion();
            createWindow();
            window.show();
            windowlogin.close();
        } else {
            alerta('warning', 'Usuario i/o contraseña incorrectas');
        }

    });
}

function getLinea() {
    $query = 'SELECT * from linea'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay lineas');
            return;
        }

        lineas = rows;
    });
}

function getMaterial() {
    $query = 'SELECT * from material'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay materiales');
            return;
        }

        materiales = rows;
    });
}

function getProceso() {
    $query = 'SELECT * from proceso'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay procesos');
            return;
        }

        procesos = rows;
    });
}

function getTipoMaterial() {
    $query = 'SELECT * from tipomaterial'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay  tipo de materiales');
            return;
        }

        tipo_materiales = rows;
    });
}

function getTipoContaminacion() {
    $query = 'SELECT * from tipocontaminacion'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay contaminantes');
            return;
        }

        tipo_contaminaciones = rows;
    });
}

function getProveedor() {
    $query = "SELECT pro.id_proveedor, concat(per.apellidos,' ',per.nombres) as nombre from proveedor pro inner join persona per on pro.id_persona = per.id_persona where pro.activo = 1 and per.activo = 1"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay proveedores');
            return;
        }

        proveedores = rows;
    });
}
//choferes
function getTransportista() {
    $query = "SELECT tra.id_transportista, concat(per.apellidos,' ',per.nombres) as nombre from transportista tra inner join persona per on tra.id_persona = per.id_persona where tra.activo = 1 and per.activo = 1"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay choferes');
            return;
        }

        transportistas = rows;
    });
}

function getTicketSinProcesar() {
    $query = `
                    select
                    tic.id_ticket, tic.fecha_ticket, veh.placa, pro.nombre as proveedor, tran.nombre as transportista
                    from
                        (select prov.id_proveedor, concat(per.apellidos, ' ', per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona) pro,
                            (select trans.id_transportista, concat(per.apellidos, ' ', per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
                                ticket tic, vehiculo veh
    where veh.id_vehiculo = tic.id_vehiculo and pro.id_proveedor = tic.id_proveedor and tran.id_transportista = veh.id_transportista and tic.procesado = 0`

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay tickets');
            return;
        }
        ticketsinprocesar = rows;
    });
}



//choferes
function getVehiculo() {
    $query = "SELECT id_vehiculo, placa, activo, id_transportista from vehiculo"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay vehiculos');
            return;
        }

        vehiculos = rows;
    });
}

function getFormasRecepcion() {
    $query = "SELECT * from formarecepcion"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if (rows.length == 0) {
            console.log('No hay formas de recepcion');
            return;
        }

        formarecepcion = rows;
    });
}

function registrarEntrada(
    { procesado, id_vehiculo, id_proveedor, id_empresa },
    { tipo_peso, forma_recepcion, peso }
) {
    let sqlticket = `insert into ticket(procesado, id_vehiculo, id_proveedor, id_empresa)
            values(${procesado}, ${id_vehiculo}, ${id_proveedor}, ${id_empresa})`
    getConnection().query(sqlticket, function (err, result) {
        if (err) alerta('error', err.message);
        if (result.affectedRows > 0) {
            let sqlpeso = `insert into peso(tipo_peso, forma_recepcion, peso, id_ticket)
            values('${tipo_peso}', '${forma_recepcion}', ${peso}, ${result.insertId})`
            getConnection().query(sqlpeso, function (err2, result2) {
                if (err2) alerta('error', err2.message);
                if (result2 && result2.affectedRows > 0){
                    alerta('success', 'Peso Entrada Registrado')
                    BrowserWindow.getFocusedWindow().reload()
                } 
            });
        }
    });
}

function procesarTicket(id_ticket) {
    let sqlprocesar = `update ticket set procesado = 1, fecha_procesado = '${moment().format("YYYY-MM-DD h:mm:ss")}' WHERE id_ticket = ` + getConnection().escape(id_ticket);
    getConnection().query(sqlprocesar, function (err, result) {
        if (err) alerta('error', err.message)
        if (result && result.affectedRows > 0) console.log("ticket procesado")
    });
}

function pesosDeTicket(id_ticket) {
    let sqlpesos = `select
    tic.id_ticket, pe.peso, pe.peso_contaminacion, pe.peso_total, pe.tipo_peso
   from ticket tic, peso pe where  tic.id_ticket = pe.id_ticket and tic.id_ticket = ` + getConnection().escape(id_ticket)
    getConnection.query(sqlpesos, function (err, rows, fields) {
        if (err) alerta('error', err.message)
        if (rows) return rows
    });
}


function createWindow() {
    window = new BrowserWindow({
        width: 800,
        minWidth: 800,
        maxWidth: 800,
        height: 600,
        minHeight: 600,
        maxHeight: 600,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    window.loadURL(url.format({
        pathname: path.join(__dirname, 'view/app.html'),
        protocol: 'file',
        slashes: true
    }));

    window.on('closed', function () {
        window = null;
    })
}

function windowticketsinpro() {
    windowtickets = new BrowserWindow({
        frame: false,
        width: 800,
        minWidth: 800,
        maxWidth: 800,
        height: 400,
        minHeight: 600,
        maxHeight: 600,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    windowtickets.loadURL(url.format({
        pathname: path.join(__dirname, 'view/tcksinprocesar.html'),
        protocol: 'file',
        slashes: true
    }));
}

function createwindowlogin() {
    windowlogin = new BrowserWindow({
        width: 400,
        minWidth: 400,
        maxWidth: 400,
        height: 400,
        minHeight: 400,
        maxHeight: 400,
        backgroundColor: "#ccc",
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    windowlogin.loadURL(url.format({
        pathname: path.join(__dirname, 'view/login.html'),
        protocol: 'file',
        slashes: true
    }));
}

function imprimirTicket() {
    const options = {
        silent: false,
        printBackground: true,
        color: false,
        margin: {
            marginType: 'printableArea'
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: 'Header of the Page',
        footer: 'Footer of the Page'
    }

    let win = BrowserWindow.getAllWindows()[0];
    win.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log('Print Initiated');
    });

}

ipcMain.on('openTicket', () => {
    windowticketsinpro();
    windowtickets.once('ready-to-show', () => {
        windowtickets.show();
    });
});

ipcMain.on('openMain', () => {
    createWindow();
    window.once('ready-to-show', () => {
        window.show();
        windowlogin.close();
    });
});

ipcMain.on('closeTicket', () => { windowtickets.close() });
ipcMain.on('hideMain', () => { window.minimize() });
ipcMain.on('showMain', () => { window.show() });
ipcMain.on('showAlert', (event, ...data) => { alerta(data[0], data[1]) });
ipcMain.on('showAlertPregunta', (event, data) => { alertaPregunta(data) });
ipcMain.on('login', (event, data) => { login(data) });
ipcMain.handle('info', (event, id) => {
    window.webContents.send('pasoinfo', id);
});

ipcMain.on('listarLineas', (event, arg) => {
    getLinea();
    event.sender.send('lineas', lineas);
})
ipcMain.on('listarProcesos', (event, arg) => {
    getProceso();
    event.sender.send('procesos', procesos);
})
ipcMain.on('listarMateriales', (event, arg) => {
    getMaterial();
    event.sender.send('materiales', materiales);
})
ipcMain.on('listarTipoMateriales', (event, arg) => {
    getTipoMaterial();
    event.sender.send('tipoMateriales', tipo_materiales);
})
ipcMain.on('listarTipoContaminacion', (event, arg) => {
    getTipoContaminacion();
    event.sender.send('tipoContaminaciones', tipo_contaminaciones);
})
ipcMain.on('listarProveedores', (event, arg) => {
    getProveedor();
    event.sender.send('proveedores', proveedores);
})
ipcMain.on('listarTransportistas', (event, arg) => {
    getTransportista();
    event.sender.send('transportistas', transportistas);
})
ipcMain.on('listarVehiculos', (event, arg) => {
    getVehiculo();
    event.sender.send('vehiculos', vehiculos);
})
ipcMain.on('listarTicketSinProcesar', (event, arg) => {
    getTicketSinProcesar();
    event.sender.send('ticketSinProcesar', ticketsinprocesar);
})
ipcMain.on('listarFormasRecepciones', (event, arg) => {
    getFormasRecepcion();
    event.sender.send('formasRecepciones', formarecepcion);
})
ipcMain.on('registrarPesoEntrada', (event, ...arg) => {
    registrarEntrada(arg[0], arg[1]);
})

ipcMain.on('registrarPesoSalida', (event, arg) => {
    registrarSalida(arg);
})

ipcMain.on('listarPesosDeTicket', async (event, arg) => {
    const pesos = await pesosDeTicket(arg);
    event.sender.send('pesosDeTicket', pesos);
})

ipcMain.on('getInfoTicket', (event, id) => {
    const ticket = getInfoTicket(parseInt(id));
    console.log(ticket);
    event.returnValue = ticket;
})
ipcMain.on('imprimir', (event, id) => {
    imprimirTicket();
})


require('electron-reload')(__dirname)

app.allowRendererProcessReuse = false;

app.whenReady().then(() => {
    createwindowlogin()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createwindowlogin()
    })
})

app.on('window-all-closed', () => {
    getConnection().end(() => {
        console.log('Conexion cerrada')
    });
    if (process.platform !== 'darwin') app.quit()
})
