const { app, ipcMain, BrowserWindow, ipcRenderer } = require('electron')
const Alert = require("electron-alert");
const { getConnection } = require('./database.js')
const path = require('path');
const url = require('url');

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


function alerta(text) {
    let alert = new Alert();

    let swalOptions = {
        title: "Aviso",
        text,
        icon: "warning",
        showCancelButton: false
    };

    alert.fireFrameless(swalOptions, null, true, false);
}

function login({ cedula, usuario, contrasena }) {

    // getConnection().connect(function (err) {
    //     if (err) {
    //         console.log(err.code);
    //         console.log(err.fatal);
    //     }
    // });

    $query = 'SELECT cre.user, cre.password_user, cre.verificado, cre.estado  from persona per inner join credencial cre on per.id_persona = cre.id_persona where per.cedula = ' + getConnection().escape(cedula);

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            alerta('Usuario no existe');
            return;
        }

        let {user,password_user,verificado,estado} = rows[0];

        if(
            user == usuario && password_user == contrasena && verificado == 1 && estado == 1
        ){
            getLinea();
            getProceso();
            getMaterial();
            getTipoMaterial();
            getTipoContaminacion();
            getProveedor();
            getTransportista();
            getVehiculo();
            createWindow();
            window.show();
            windowlogin.close();
        }else{
            alerta('Usuario i/o contraseña incorrectas');
        }

    });
}

function getLinea(){
    $query = 'SELECT * from linea'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay lineas');
            return;
        }

         lineas = rows;
    });
}

function getMaterial(){
    $query = 'SELECT * from material'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay materiales');
            return;
        }

         materiales = rows;
    });
}

function getProceso(){
    $query = 'SELECT * from proceso'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay procesos');
            return;
        }

         procesos = rows;
    });
}

function getTipoMaterial(){
    $query = 'SELECT * from tipomaterial'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay  tipo de materiales');
            return;
        }

         tipo_materiales = rows;
    });
}

function getTipoContaminacion(){
    $query = 'SELECT * from tipocontaminacion'

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay contaminantes');
            return;
        }

         tipo_contaminaciones = rows;
    });
}

function getProveedor(){
    $query = "SELECT pro.id_proveedor, pro.activo, concat(per.apellidos,' ',per.nombres) as nombre from proveedor pro inner join persona per on pro.id_persona = per.id_persona"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay proveedores');
            return;
        }

        proveedores = rows;
    });
}
//choferes
function getTransportista(){
    $query = "SELECT tra.id_transportista, tra.activo, concat(per.apellidos,' ',per.nombres) as nombre from transportista tra inner join persona per on tra.id_persona = per.id_persona"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay choferes');
            return;
        }

        transportistas = rows;
    });
}

//choferes
function getVehiculo(){
    $query = "SELECT id_vehiculo, placa, activo, id_transportista from vehiculo"

    getConnection().query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            return;
        }

        if(rows.length == 0){
            console.log('No hay vehiculos');
            return;
        }

        vehiculos = rows;
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
ipcMain.on('showAlert', (event,data) => { alerta(data) });
ipcMain.on('login', (event, data) => { login(data) });
ipcMain.on('info', (event, data) => {
    window.webContents.send('pasoinfo', data);
});

ipcMain.on('listarLineas',(event,arg)=>{
    getLinea();
    event.sender.send('lineas', lineas);
})
ipcMain.on('listarProcesos',(event,arg)=>{
    getProceso();
    event.sender.send('procesos', procesos);
})
ipcMain.on('listarMateriales',(event,arg)=>{
    getMaterial();
    event.sender.send('materiales', materiales);
})
ipcMain.on('listarTipoMateriales',(event,arg)=>{
    getTipoMaterial();
    event.sender.send('tipoMateriales', tipo_materiales);
})
ipcMain.on('listarTipoContaminacion',(event,arg)=>{
    getTipoContaminacion();
    event.sender.send('tipoContaminaciones', tipo_contaminaciones);
})
ipcMain.on('listarProveedores',(event,arg)=>{
    getProveedor();
    event.sender.send('proveedores', proveedores);
})
ipcMain.on('listarTransportistas',(event,arg)=>{
    getTransportista();
    event.sender.send('transportistas', transportistas);
})
ipcMain.on('listarVehiculos',(event,arg)=>{
    getVehiculo();
    event.sender.send('vehiculos',vehiculos);
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
    getConnection().end(()=>{
        console.log('Conexion cerrada')
    });
    if (process.platform !== 'darwin') app.quit()
})



