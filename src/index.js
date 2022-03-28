const { app, ipcMain, BrowserWindow, ipcRenderer } = require('electron')
const Alert = require("electron-alert");
const { getConnection } = require('./database.js')
const path = require('path');
const url = require('url');
const moment = require('moment');

let window;
let windowtickets;
let windowlogin;
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
           procesarTicket(id)
        } else if (result.dismiss === Alert.DismissReason.cancel) {
            console.log('Cancelado......')
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
    tic.id_ticket, tic.fecha_ticket, veh.placa , pro.nombre as proveedor, tran.nombre as transportista
    from 
    (select prov.id_proveedor, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona ) pro,
    (select trans.id_transportista, concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
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
    let sqlticket = `insert into ticket(procesado,id_vehiculo,id_proveedor,id_empresa) 
    values(${procesado},${id_vehiculo},${id_proveedor},${id_empresa})`
    getConnection().query(sqlticket, function (err, result) {
        if (err) alerta('error', err.message);
        if (result.affectedRows > 0) {
            let sqlpeso = `insert into peso(tipo_peso,forma_recepcion,peso,id_ticket) 
        values('${tipo_peso}','${forma_recepcion}',${peso},${result.insertId})`
            getConnection().query(sqlpeso, function (err2, result2) {
                if (err2) alerta('error', err2.message);
                if (result2 && result2.affectedRows > 0) alerta('success', 'Peso Entrada Registrado')
            });
        }
    });
}

// function registrarSalida(
//     { id_ticket, tipo_peso, id_tipo_material, forma_recepcion, peso, peso_contaminacion, porcentaje_contaminacion, peso_total }
// ) {
//     let sqlpeso = `insert into peso(id_ticket,tipo_peso,id_tipo_peso,id_tipo_material,forma_recepcion,peso,peso_contaminacion,porcentaje_contaminacion,peso_total) 
//     values(${id_ticket},${tipo_peso},${id_tipo_peso},${id_tipo_material},${forma_recepcion},${peso},${peso_contaminacion},${porcentaje_contaminacion}},${peso_total})`
//     getConnection().query(sqlpeso, function (err, result) {
//         if (err) alerta('error', err.message);
//         if (result && result.affectedRows > 0) alertaPregunta()
//     });
// }

function procesarTicket(id_ticket) {
    let sqlprocesar = `update ticket set procesado = 1, fecha_procesado = ${moment.format("YYYY-MM-DD h:mm:ss")} WHERE id_ticket = ` + getConnection().escape(id_ticket);
    getConnection().query(sqlprocesar, function (err, result) {
        if (err) alerta('error', err.message)
        if (result && result.affectedRows > 0) alerta('success', 'Ticket Procesado')
    });
}

function pesosDeTicket(id_ticket){
    let sqlpesos = `select
    tic.id_ticket, pe.peso, pe.peso_contaminacion, pe.peso_total, pe.tipo_peso
   from ticket tic, peso pe where  tic.id_ticket = pe.id_ticket and tic.id_ticket = ` + getConnection().escape(id_ticket)
   getConnection.query(sqlpesos,function(err,rows,fields){
       if(err) alerta('error',err.message)
       if(rows) return rows
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
ipcMain.on('showAlert', (event, ...data) => { alerta(data[0],data[1]) });
ipcMain.on('showAlertPregunta', (event, data) => { alertaPregunta(data) });
ipcMain.on('login', (event, data) => { login(data) });
ipcMain.handle('info',(event, id) => {
    window.webContents.send('pasoinfo',id);
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

ipcMain.on('listarPesosDeTicket',async(event,arg)=>{
    const pesos = await pesosDeTicket(arg);
    event.sender.send('pesosDeTicket', pesos);
})

ipcMain.on('getInfoTicket',(event,id)=>{
    const ticket = getInfoTicket(parseInt(id));
    console.log(ticket);
    event.returnValue = ticket;
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
