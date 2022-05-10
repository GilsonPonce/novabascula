const { ipcRenderer } = require('electron');
const { getPersona,
    getAllPersona,
    insertPersona,
    deletePersona,
    updatePersona,
    insertCredencial,
    updateCredencial,
    insertVehiculo,
    insertContaminacion,
    insertLinea,
    insertTipoVehiculo,
    insertProceso,
    insertMaterial,
    insertTipoMaterial,
    insertTipoContaminacion,
    getAllLinea,
    getAllProceso,
    getAllMaterial,
    getAllTransportista,
    getAllTipoVehiculo,
    getAllTicket,
    getTicket,
    getAllPeso,
    deletePeso,
    getPeso,
    getAllContaminacion,
    deleteContaminacion,
    getAllTipoMaterial,
    getAllFormaRecepcion,
    getAllVehiculo,
    getAllProveedor,
    getAllTipoContaminacion,
    deleteTicket,
    updateTicket,
    updatePeso,
    insertProveedor,
    insertTransportista,
    deleteProveedor,
    getProveedor,
    updateProveedor,
    getTransportista,
    updateTransportista,
    deleteTransportista,
    updateVehiculo,
    deleteVehiculo,
    getVehiculo,
    deleteLinea,
    insertFormaRecepcion,
    getLinea,
    getFormaRecepcion,
    deleteFormaRecepcion,
    updateFormaRecepcion,
    updateMaterial,
    updateLinea,
    updateTipoMaterial,
    updateProceso,
    updateTipoVehiculo,
    updateTipoContaminacion,
    deleteTipoMaterial,
    deleteMaterial,
    deleteProceso,
    getMaterial,
    getProceso,
    getTipoMaterial,
    getTipoVehiculo,
    getTipoContaminacion,
    deleteTipoVehiculo,
    deleteTipoContaminacion,
    getAllUsuario } = require('../databaseadmin');

const input_host = document.getElementById("input_host")
const select_opcion = document.getElementById("select_opcion")
const form_persona = document.getElementById("form_persona")
const form_credencial = document.getElementById("form_credencial")
const form_proveedor = document.getElementById("form_proveedor")
const form_transportista = document.getElementById("form_transportista")
const form_vehiculo = document.getElementById("form_vehiculo")
const form_linea = document.getElementById("form_linea")
const form_material = document.getElementById("form_material")
const form_proceso = document.getElementById("form_proceso")
const form_tipo_material = document.getElementById("form_tipo_material")
const form_tipo_vehiculo = document.getElementById("form_tipo_vehiculo")
const form_tipo_contaminacion = document.getElementById("form_tipo_contaminacion")
const form_edicion = document.getElementById("form_edicion")
const form_forma_recepcion = document.getElementById("form_forma_recepcion")
const input_form_usuario_cedula = document.getElementById("input_form_usuario_cedula")
const input_form_usuario_nombres = document.getElementById("input_form_usuario_nombres")
const input_form_usuario_apellidos = document.getElementById("input_form_usuario_apellidos")
const input_form_usuario_fecha_nacimiento = document.getElementById("input_form_usuario_fecha_nacimiento")
const select_form_usuario_sexo = document.getElementById("select_form_usuario_sexo")
const select_form_usuario_estado_civil = document.getElementById("select_form_usuario_estado_civil")
const select_form_usuario_activo = document.getElementById("select_form_usuario_activo")
const select_form_proveedor_activo = document.getElementById("select_form_proveedor_activo")
const select_form_transportista_activo = document.getElementById("select_form_transportista_activo")
const select_form_vehiculo_transportista = document.getElementById("select_form_vehiculo_transportista")
const select_form_vehiculo_tipo_vehiculo = document.getElementById("select_form_vehiculo_tipo_vehiculo")
const select_form_vehiculo_activo = document.getElementById("select_form_vehiculo_activo")
const select_form_proceso_linea = document.getElementById("select_form_proceso_linea")
const select_form_material_linea = document.getElementById("select_form_material_linea")
const select_form_material_proceso = document.getElementById("select_form_material_proceso")
const select_form_tipo_material_proceso = document.getElementById("select_form_tipo_material_proceso")
const select_form_tipo_material_linea = document.getElementById("select_form_tipo_material_linea")
const select_form_tipo_material_material = document.getElementById("select_form_tipo_material_material")
const select_form_peso_tipo_peso = document.getElementById("select_form_peso_tipo_peso")
const input_form_usuario_ciudadania = document.getElementById("input_form_usuario_ciudadania")
const input_form_forma_recepcion_nombre = document.getElementById("input_form_forma_recepcion_nombre")
const input_form_usuario_instruccion = document.getElementById("input_form_usuario_instruccion")
const input_form_usuario_fecha_expedicion = document.getElementById("input_form_usuario_fecha_expedicion")
const input_form_usuario_fecha_expiracion = document.getElementById("input_form_usuario_fecha_expiracion")
const input_form_usuario_lugar_expedicion = document.getElementById("input_form_usuario_lugar_expedicion")
const input_form_credencial_usuario = document.getElementById("input_form_credencial_usuario")
const input_form_credencial_contrasena = document.getElementById("input_form_credencial_contrasena")
const input_form_transportista_fecha_vencimiento = document.getElementById("input_form_transportista_fecha_vencimiento")
const input_form_vehiculo_placa = document.getElementById("input_form_vehiculo_placa")
const input_form_vehiculo_fecha_vencimiento_matricula = document.getElementById("input_form_vehiculo_fecha_vencimiento_matricula")
const input_form_tipo_contaminacion_nombre = document.getElementById("input_form_tipo_contaminacion_nombre")
const input_form_tipo_vehiculo_nombre = document.getElementById("input_form_tipo_vehiculo_nombre")
const input_form_linea_nombre = document.getElementById("input_form_linea_nombre")
const input_form_proceso_nombre = document.getElementById("input_form_proceso_nombre")
const input_form_material_nombre = document.getElementById("input_form_material_nombre")
const input_form_tipo_material_nombre = document.getElementById("input_form_tipo_material_nombre")
const input_form_peso_id_peso = document.getElementById("input_form_peso_id_peso")
const input_form_peso_peso = document.getElementById("input_form_peso_peso")
const input_form_peso_contaminacion = document.getElementById("input_form_peso_contaminacion")
const input_form_peso_porcentaje_contaminacion = document.getElementById("input_form_peso_porcentaje_contaminacion")
const input_form_peso_total = document.getElementById("input_form_peso_total")
const input_form_peso_fecha = document.getElementById("input_form_peso_fecha")
const select_form_peso_linea = document.getElementById("select_form_peso_linea")
const select_form_peso_proceso = document.getElementById("select_form_peso_proceso")
const select_form_peso_material = document.getElementById("select_form_peso_material")
const select_form_peso_tipo_material = document.getElementById("select_form_peso_tipo_material")
const select_form_peso_contaminacion = document.getElementById("select_form_peso_contaminacion")
const input_form_ticket_fecha = document.getElementById("input_form_ticket_fecha")
const select_form_ticket_procesado = document.getElementById("select_form_ticket_procesado")
const input_form_ticket_fecha_procesado = document.getElementById("input_form_ticket_fecha_procesado")
const select_form_ticket_transportista = document.getElementById("select_form_ticket_transportista")
const select_form_ticket_vehiculo = document.getElementById("select_form_ticket_vehiculo")
const select_form_ticket_proveedor = document.getElementById("select_form_ticket_proveedor")
const select_form_peso_forma_recepcion = document.getElementById("select_form_peso_forma_recepcion")
const texttarea_form_ticket_observaciones = document.getElementById("texttarea_form_ticket_observaciones")
const body_table_form_ticket_peso = document.getElementById("body_table_form_ticket_peso")
const lista_form_peso_contaminaciones = document.getElementById("lista_form_peso_contaminaciones")
const boton_form_credencial_registrar = document.getElementById("boton_form_credencial_registrar")
const boton_form_peso = document.getElementById("boton_form_peso")
const boton_form_ticket = document.getElementById("boton_form_ticket")
const boton_form_peso_contaminacion = document.getElementById("boton_form_peso_contaminacion")
const boton_form_peso_retroceder = document.getElementById("boton_form_peso_retroceder")
const boton_form_proveedor = document.getElementById("boton_form_proveedor");
const boton_form_transportista = document.getElementById("boton_form_transportista");
const boton_form_forma_recepcion = document.getElementById("boton_form_forma_recepcion")
const boton_form_linea = document.getElementById("boton_form_linea")
const boton_form_material = document.getElementById("boton_form_material")
const boton_form_tipo_material = document.getElementById("boton_form_tipo_material")
const boton_form_proceso = document.getElementById("boton_form_proceso")
const boton_form_tipo_contaminacion = document.getElementById("boton_form_tipo_contaminacion")
const boton_form_tipo_vehiculo = document.getElementById("boton_form_tipo_vehiculo")
const aviso = document.getElementById("aviso")
let id = 0;

select_opcion.addEventListener('change', habilitarForm)

function toggleAviso(accion) {
    if (accion == "show") aviso.classList.remove("d-none")
    if (accion == "hidden") aviso.classList.add("d-none")
}

function hiddenForms() {
    form_persona.classList.add("d-none")
    form_credencial.classList.add("d-none")
    form_proveedor.classList.add("d-none")
    form_transportista.classList.add("d-none")
    form_vehiculo.classList.add("d-none")
    form_linea.classList.add("d-none")
    form_material.classList.add("d-none")
    form_proceso.classList.add("d-none")
    form_tipo_material.classList.add("d-none")
    form_tipo_vehiculo.classList.add("d-none")
    form_tipo_contaminacion.classList.add("d-none")
    form_edicion.classList.add("d-none")
    form_ticket.classList.add("d-none")
    form_peso.classList.add("d-none")
    form_forma_recepcion.classList.add("d-none")
}

function htmlUsuario() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Usuario</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionUsuario()" aria-label="Default select example" id="select_edicion_usuario">
    <option selected>Open this select menu</option>`
    getAllUsuario()
        .then((personas) => {
            if (personas.length > 0) {
                personas.map(({ id_persona, nombre }) => {
                    html += `<option value="${id_persona}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="deleteUsuario()" id="boton_form_edicion_delete">Eliminar</button>
                </div>`;
                boton_form_credencial_registrar.removeAttribute('onclick')
                boton_form_credencial_registrar.setAttribute('onclick', 'updateUsuario()')
            }
        })
}

function htmlEditarProveedor() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Proveedor</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionProveedor()" aria-label="Default select example" id="select_edicion_proveedor">
    <option value="" selected>Open this select menu</option>`
    getAllProveedor()
        .then((proveedor) => {
            if (proveedor.length > 0) {
                proveedor.map(({ id_proveedor, nombre }) => {
                    html += `<option value="${id_proveedor}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarProveedor()" id="boton_form_edicion_delete">Eliminar</button>
                </div>`;
                boton_form_proveedor.removeAttribute('onclick')
                boton_form_proveedor.setAttribute('onclick', 'actualizarProveedor()')
                boton_form_proveedor.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarTransportista() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Transportista</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionTransportista()" aria-label="Default select example" id="select_edicion_transportista">
    <option value="" selected>Open this select menu</option>`
    getAllTransportista()
        .then((transportista) => {
            if (transportista.length > 0) {
                transportista.map(({ id_transportista, nombre }) => {
                    html += `<option value="${id_transportista}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarTransportista()" id="boton_form_edicion_delete">Eliminar</button>
                </div>`;
                boton_form_transportista.removeAttribute('onclick')
                boton_form_transportista.setAttribute('onclick', 'actualizarTransportista()')
                boton_form_transportista.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarVehiculo() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Vehiculo</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionVehiculo()" aria-label="Default select example" id="select_edicion_vehiculo">
    <option value="" selected>Open this select menu</option>`
    getAllVehiculo()
        .then((vehiculo) => {
            if (vehiculo.length > 0) {
                vehiculo.map(({ id_vehiculo, placa }) => {
                    html += `<option value="${id_vehiculo}">${placa}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarVehiculo()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_vehiculo.removeAttribute('onclick')
                boton_form_vehiculo.setAttribute('onclick', 'actualizarVehiculo()')
                boton_form_vehiculo.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarLinea() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Linea</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionLinea()" aria-label="Default select example" id="select_edicion_linea">
    <option value="" selected>Open this select menu</option>`
    getAllLinea()
        .then((linea) => {
            if (linea.length > 0) {
                linea.map(({ id_linea, nombre }) => {
                    html += `<option value="${id_linea}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarLinea()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_linea.removeAttribute('onclick')
                boton_form_linea.setAttribute('onclick', 'actualizarLinea()')
                boton_form_linea.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarProceso() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Linea</label><div class="col-9 mb-2">
    <select class="form-select" onchange="llenarSelectProceso()" aria-label="Default select example" id="select_edicion_linea">
    <option value="" selected>Open this select menu</option>`
    getAllLinea()
        .then((linea) => {
            if (linea.length > 0) {
                linea.map(({ id_linea, nombre }) => {
                    html += `<option value="${id_linea}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Proceso</label><div class="col-9 mb-2">
                <select class="form-select" onchange="formEdicionProceso()" aria-label="Default select example" id="select_edicion_proceso" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarProceso()" id="boton_edicion_eliminar" disabled>Eliminar</button>
                </div>`;
                boton_form_proceso.removeAttribute('onclick')
                boton_form_proceso.setAttribute('onclick', 'actualizarProceso()')
                boton_form_proceso.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarMaterial() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Linea</label><div class="col-9 mb-2">
    <select class="form-select" onchange="llenarSelectProceso()" aria-label="Default select example" id="select_edicion_linea">
    <option value="" selected>Open this select menu</option>`
    getAllLinea()
        .then((linea) => {
            if (linea.length > 0) {
                linea.map(({ id_linea, nombre }) => {
                    html += `<option value="${id_linea}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Proceso</label><div class="col-9 mb-2">
                <select class="form-select" onchange="llenarSelectMaterial()" aria-label="Default select example" id="select_edicion_proceso" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Material</label><div class="col-9 mb-2">
                <select class="form-select" onchange="formEdicionMaterial()" aria-label="Default select example" id="select_edicion_material" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarMaterial()" id="boton_edicion_eliminar" disabled>Eliminar</button>
                </div>`;
                boton_form_material.removeAttribute('onclick')
                boton_form_material.setAttribute('onclick', 'actualizarMaterial()')
                boton_form_material.innerHTML = "Actualizar"
                select_form_material_proceso.setAttribute("disabled", "")
                select_form_material_linea.setAttribute("disabled", "")
            }
        })
}

function htmlEditarTipoMaterial() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Linea</label><div class="col-9 mb-2">
    <select class="form-select" onchange="llenarSelectProceso()" aria-label="Default select example" id="select_edicion_linea">
    <option value="" selected>Open this select menu</option>`
    getAllLinea()
        .then((linea) => {
            if (linea.length > 0) {
                linea.map(({ id_linea, nombre }) => {
                    html += `<option value="${id_linea}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Proceso</label><div class="col-9 mb-2">
                <select class="form-select" onchange="llenarSelectMaterial()" aria-label="Default select example" id="select_edicion_proceso" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Material</label><div class="col-9 mb-2">
                <select class="form-select" onchange="llenarSelectTipoMaterial()" aria-label="Default select example" id="select_edicion_material" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Tipo Material</label><div class="col-9 mb-2">
                <select class="form-select" onchange="formEdicionTipoMaterial()" aria-label="Default select example" id="select_edicion_tipo_material" disabled>
                <option value="" selected>Open this select menu</option> </select></div>`
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarTipoMaterial()" id="boton_edicion_eliminar" disabled>Eliminar</button>
                </div>`;
                boton_form_tipo_material.removeAttribute('onclick')
                boton_form_tipo_material.setAttribute('onclick', 'actualizarTipoMaterial()')
                boton_form_tipo_material.innerHTML = "Actualizar"
                select_form_tipo_material_proceso.setAttribute("disabled", "")
                select_form_tipo_material_linea.setAttribute("disabled", "")
                select_form_tipo_material_material.setAttribute("disabled", "")
            }
        })
}


function htmlEditarFormaRecepcion() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Forma Recepcion</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionFormaRecepcion()" aria-label="Default select example" id="select_edicion_forma_recepcion">
    <option value="" selected>Open this select menu</option>`
    getAllFormaRecepcion()
        .then((forma) => {
            if (forma.length > 0) {
                forma.map(({ id_forma_recepcion, nombre }) => {
                    html += `<option value="${id_forma_recepcion}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarFormaRecepcion()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_forma_recepcion.removeAttribute('onclick')
                boton_form_forma_recepcion.setAttribute('onclick', 'actualizarFormaRecepcion()')
                boton_form_forma_recepcion.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarTipoVehiculo() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Tipo Vehiculo</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionTipoVehiculo()" aria-label="Default select example" id="select_edicion_tipo_vehiculo">
    <option value="" selected>Open this select menu</option>`
    getAllTipoVehiculo()
        .then((tipo_vehiculos) => {
            if (tipo_vehiculos.length > 0) {
                tipo_vehiculos.map(({ id_tipo_vehiculo, nombre }) => {
                    html += `<option value="${id_tipo_vehiculo}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarTipoVehiculo()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_tipo_vehiculo.removeAttribute('onclick')
                boton_form_tipo_vehiculo.setAttribute('onclick', 'actualizarTipoVehiculo()')
                boton_form_tipo_vehiculo.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarTipoContaminacion() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Tipo Contaminacion</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionTipoContaminacion()" aria-label="Default select example" id="select_edicion_tipo_contaminacion">
    <option value="" selected>Open this select menu</option>`
    getAllTipoContaminacion()
        .then((tipo_contaminacion) => {
            if (tipo_contaminacion.length > 0) {
                tipo_contaminacion.map(({ id_tipo_contaminacion, nombre }) => {
                    html += `<option value="${id_tipo_contaminacion}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarTipoContaminacion()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_tipo_contaminacion.removeAttribute('onclick')
                boton_form_tipo_contaminacion.setAttribute('onclick', 'actualizarTipoContaminacion()')
                boton_form_tipo_contaminacion.innerHTML = "Actualizar"
            }
        })
}

function htmlEditarTipoVehiculo() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Tipo Vehiculo</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionTipoVehiculo()" aria-label="Default select example" id="select_edicion_tipo_vehiculo">
    <option value="" selected>Open this select menu</option>`
    getAllTipoVehiculo()
        .then((tipo_vehiculos) => {
            if (tipo_vehiculos.length > 0) {
                tipo_vehiculos.map(({ id_tipo_vehiculo, nombre }) => {
                    html += `<option value="${id_tipo_vehiculo}">${nombre}</option>`
                })
                html += `</select></div>`;
                form_edicion.innerHTML = html;
                form_edicion.innerHTML += `<div class="col-12">
                <button class="btn btn-danger" onclick="eliminarTipoVehiculo()" id="boton_edicion_eliminar">Eliminar</button>
                </div>`;
                boton_form_tipo_vehiculo.removeAttribute('onclick')
                boton_form_tipo_vehiculo.setAttribute('onclick', 'actualizarTipoVehiculo()')
                boton_form_tipo_vehiculo.innerHTML = "Actualizar"
            }
        })
}

function eliminarLinea() {
    let id = document.getElementById("select_edicion_linea").value
    if (!isNaN(parseInt(id))) {
        deleteLinea(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarLinea()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarProceso() {
    let id = document.getElementById("select_edicion_proceso").value
    if (!isNaN(parseInt(id))) {
        deleteProceso(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarProceso()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarMaterial() {
    let id = document.getElementById("select_edicion_material").value
    if (!isNaN(parseInt(id))) {
        deleteMaterial(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarMaterial()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarTipoMaterial() {
    let id = document.getElementById("select_edicion_tipo_material").value
    if (!isNaN(parseInt(id))) {
        deleteTipoMaterial(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarTipoMaterial()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarFormaRecepcion() {
    let id = document.getElementById("select_edicion_forma_recepcion").value
    if (!isNaN(parseInt(id))) {
        deleteFormaRecepcion(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarFormaRecepcion()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarProveedor() {
    let id = document.getElementById("select_edicion_proveedor").value
    if (!isNaN(parseInt(id))) {
        deleteProveedor(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarProveedor()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarTransportista() {
    let id = document.getElementById("select_edicion_transportista").value
    if (!isNaN(parseInt(id))) {
        deleteTransportista(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarTransportista()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarVehiculo() {
    let id = document.getElementById("select_edicion_vehiculo").value
    if (!isNaN(parseInt(id))) {
        deleteVehiculo(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarVehiculo()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarTipoVehiculo() {
    let id = document.getElementById("select_edicion_tipo_vehiculo").value
    if (!isNaN(parseInt(id))) {
        deleteTipoVehiculo(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarTipoVehiculo()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function eliminarTipoContaminacion() {
    let id = document.getElementById("select_edicion_tipo_contaminacion").value
    if (!isNaN(parseInt(id))) {
        deleteTipoContaminacion(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms();
                htmlEditarTipoContaminacion()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}



function deleteUsuario() {
    let id = document.getElementById("select_edicion_usuario").value
    if (!isNaN(parseInt(id))) {
        deletePersona(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                htmlUsuario();
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    }
}

function registrarUsuario() {
    if (form_edicion.classList.contains("d-none")) {
        if (
            input_form_usuario_cedula.value != "" &&
            input_form_usuario_nombres.value != "" &&
            input_form_usuario_apellidos.value != "" &&
            !isNaN(parseInt(select_form_usuario_activo.value)) &&
            input_form_credencial_contrasena.value != "" &&
            input_form_credencial_usuario.value != ""
        ) {
            insertPersona({
                cedula: input_form_usuario_cedula.value,
                nombres: input_form_usuario_nombres.value,
                apellidos: input_form_usuario_apellidos.value,
                activo: parseInt(select_form_usuario_activo.value),
                fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
                sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
                estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
                ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
                instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
                lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
                fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
                fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value
            }).then((id_usuario) => {
                return insertCredencial({
                    id_persona: id_usuario,
                    user: input_form_credencial_usuario.value,
                    password_user: input_form_credencial_contrasena.value,
                    estado: parseInt(select_form_usuario_activo.value)
                })
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
        } else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        }
    } else {
        if (!isNaN(Number(document.getElementById("select_edicion_persona").value)) &&
            input_form_credencial_usuario.value != "" &&
            input_form_credencial_contrasena.value != "" &&
            !isNaN(parseInt(select_form_usuario_activo.value))) {
            insertCredencial({
                id_persona: Number(document.getElementById("select_edicion_persona").value),
                user: input_form_credencial_usuario.value,
                password_user: input_form_credencial_contrasena.value,
                estado: parseInt(select_form_usuario_activo.value)
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
        } else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        }
    }
}

function registrarProveedor() {
    if (form_edicion.classList.contains("d-none")) {
        if (
            input_form_usuario_cedula.value != "" &&
            input_form_usuario_nombres.value != "" &&
            input_form_usuario_apellidos.value != "" &&
            !isNaN(parseInt(select_form_usuario_activo.value)) &&
            !isNaN(parseInt(select_form_proveedor_activo.value))
        ) {
            getAllPersona()
            .then((array_personas)=>{
                let nombrereg = input_form_usuario_apellidos.value + " " + input_form_usuario_nombres.value;
                array_personas.map(({nombre})=>{
                    if(nombrereg == nombre){
                        throw new Error('Usuario ya registrado')
                    }
                })
                return insertPersona({
                    cedula: input_form_usuario_cedula.value,
                    nombres: input_form_usuario_nombres.value,
                    apellidos: input_form_usuario_apellidos.value,
                    activo: parseInt(select_form_usuario_activo.value),
                    fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
                    sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
                    estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
                    ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
                    instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
                    lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
                    fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
                    fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value
                })
            })
            .catch((mensaje)=>{
                ipcRenderer.send('showAlert', "warning", mensaje.message) 
            })
            .then((id_usuario) => {
                return insertProveedor({
                    id_persona: id_usuario,
                    activo: parseInt(select_form_proveedor_activo.value)
                })
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            })
        } else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        }
    } else {
        if (!isNaN(Number(document.getElementById("select_edicion_persona").value)) && !isNaN(parseInt(select_form_proveedor_activo.value))) {
            insertProveedor({
                id_persona: Number(document.getElementById("select_edicion_persona").value),
                activo: parseInt(select_form_proveedor_activo.value)
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
        } else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        }
    }
}

function registrarTransportista() {
    if (form_edicion.classList.contains("d-none")) {
        if (
            input_form_usuario_cedula.value != "" &&
            input_form_usuario_nombres.value != "" &&
            input_form_usuario_apellidos.value != "" &&
            !isNaN(parseInt(select_form_usuario_activo.value)) &&
            !isNaN(parseInt(select_form_transportista_activo.value))
        ) {
            insertPersona({
                cedula: input_form_usuario_cedula.value,
                nombres: input_form_usuario_nombres.value,
                apellidos: input_form_usuario_apellidos.value,
                activo: parseInt(select_form_usuario_activo.value),
                fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
                sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
                estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
                ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
                instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
                lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
                fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
                fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value
            }).then((id_usuario) => {
                return insertTransportista({
                    vencimiento_licencia: input_form_transportista_fecha_vencimiento.value == "" ? null : input_form_transportista_fecha_vencimiento.value,
                    activo: parseInt(select_form_transportista_activo.value),
                    id_persona: id_usuario
                })
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
        } else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        }
    }else{
        if(!isNaN(Number(document.getElementById("select_edicion_persona").value)) && !isNaN(parseInt(select_form_transportista_activo.value))){
            insertTransportista({
                vencimiento_licencia: input_form_transportista_fecha_vencimiento.value == "" ? null : input_form_transportista_fecha_vencimiento.value,
                activo: parseInt(select_form_transportista_activo.value),
                id_persona: Number(document.getElementById("select_edicion_persona").value)
            }).then((id) => {
                if (id > 0) {
                    location.reload();
                    ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
        }else {
            ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
        } 
    }
}

function registrarVehiculo() {
    if (
        input_form_vehiculo_placa.value != "" &&
        !isNaN(parseInt(select_form_vehiculo_activo.value)) &&
        !isNaN(parseInt(select_form_vehiculo_transportista.value)) &&
        !isNaN(parseInt(select_form_vehiculo_tipo_vehiculo.value))
    ) {
        insertVehiculo({
            placa: input_form_vehiculo_placa.value,
            vencimiento_matricula: input_form_vehiculo_fecha_vencimiento_matricula.value == "" ? null : input_form_vehiculo_fecha_vencimiento_matricula.value,
            activo: parseInt(select_form_vehiculo_activo.value),
            id_transportista: parseInt(select_form_vehiculo_transportista.value),
            id_tipo_vehiculo: parseInt(select_form_vehiculo_tipo_vehiculo.value)
        }).then((id_insertado) => {
            if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            location.reload();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
    }
}

function registrarContaminacion() {
    if (input_form_tipo_contaminacion_nombre.value != "") {
        insertTipoContaminacion({
            nombre: input_form_tipo_contaminacion_nombre.value
        })
            .then((id_insertado) => {
                if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                location.reload();
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    } else {
        input_form_tipo_contaminacion_nombre.focus()
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! ti@")
    }
}

function registrarTipoVehiculo() {
    if (input_form_tipo_vehiculo_nombre.value != "") {
        insertTipoVehiculo({
            nombre: input_form_tipo_vehiculo_nombre.value
        })
            .then((id_insertado) => {
                if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                location.reload();
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    } else {
        input_form_tipo_vehiculo_nombre.focus()
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! ti@")
    }
}

function registrarLinea() {
    if (input_form_linea_nombre.value != "") {
        insertLinea({
            nombre: input_form_linea_nombre.value
        })
            .then((id_insertado) => {
                if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
                location.reload();
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    } else {
        input_form_linea_nombre.focus()
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! ti@")
    }
}

function registrarProceso() {
    if (
        input_form_proceso_nombre.value != "" &&
        !isNaN(parseInt(select_form_proceso_linea.value))
    ) {
        insertProceso({
            nombre: input_form_proceso_nombre.value,
            id_linea: parseInt(select_form_proceso_linea.value)
        }).then((id_insertado) => {
            if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            location.reload();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Campeon")
    }
}

function registrarMaterial() {
    if (
        input_form_material_nombre.value != "" &&
        !isNaN(parseInt(select_form_material_proceso.value))
    ) {
        insertMaterial({
            nombre: input_form_material_nombre.value,
            id_proceso: parseInt(select_form_material_proceso.value)
        }).then((id_insertado) => {
            if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            location.reload();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        });
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Tilin")
    }
}

function registrarTipoMaterial() {
    if (
        input_form_tipo_material_nombre.value != "" &&
        !isNaN(parseInt(select_form_tipo_material_material.value))
    ) {
        insertTipoMaterial({
            nombre: input_form_tipo_material_nombre.value,
            id_material: parseInt(select_form_tipo_material_material.value)
        }).then((id_insertado) => {
            if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            location.reload();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Tilin")
    }
}

function registrarFormaRecepcion() {
    if (
        input_form_forma_recepcion_nombre.value != ""
    ) {
        insertFormaRecepcion({
            nombre: input_form_forma_recepcion_nombre.value,
        }).then((id_insertado) => {
            if (id_insertado > 0) ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            location.reload();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Tilin")
    }
}

function updateUsuario() {
    if (
        input_form_usuario_cedula.value != "" &&
        input_form_usuario_nombres.value != "" &&
        input_form_usuario_apellidos.value != "" &&
        !isNaN(parseInt(select_form_usuario_activo.value)) &&
        input_form_credencial_contrasena.value != "" &&
        input_form_credencial_usuario.value != "" &&
        !isNaN(parseInt(document.getElementById("select_edicion_usuario").value))
    ) {
        updatePersona({
            activo: parseInt(select_form_usuario_activo.value),
            cedula: input_form_usuario_cedula.value,
            nombres: input_form_usuario_nombres.value,
            apellidos: input_form_usuario_apellidos.value,
            fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
            sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
            estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
            ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
            instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
            lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
            fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
            fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value,
            id_persona: parseInt(document.getElementById("select_edicion_usuario").value)
        }).then((files) => {
            if (files > 0) {
                return updateCredencial({
                    user: input_form_credencial_usuario.value,
                    password_user: input_form_credencial_contrasena.value,
                    estado: parseInt(select_form_usuario_activo.value),
                    id_persona: parseInt(document.getElementById("select_edicion_usuario").value)
                })
            }
        }).then((id) => {
            if (id > 0) {
                cleanFromUsuario()
                htmlUsuario();
                hiddenForms();
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Falta algun campo necesario")
    }
}

function actualizarProveedor() {
    if (
        input_form_usuario_cedula.value != "" &&
        input_form_usuario_nombres.value != "" &&
        input_form_usuario_apellidos.value != "" &&
        !isNaN(parseInt(select_form_usuario_activo.value)) &&
        !isNaN(parseInt(select_form_proveedor_activo.value)) &&
        !isNaN(parseInt(document.getElementById("select_edicion_proveedor").value))
    ) {
        getProveedor(document.getElementById("select_edicion_proveedor").value)
            .then((rows) => {
                let { id_persona } = rows[0]

                return updatePersona({
                    activo: parseInt(select_form_usuario_activo.value),
                    cedula: input_form_usuario_cedula.value,
                    nombres: input_form_usuario_nombres.value,
                    apellidos: input_form_usuario_apellidos.value,
                    fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
                    sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
                    estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
                    ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
                    instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
                    lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
                    fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
                    fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value,
                    id_persona: id_persona
                })


            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((files) => {
                if (files > 0) {
                    return updateProveedor({
                        activo: parseInt(select_form_proveedor_activo.value),
                        id_proveedor: parseInt(document.getElementById("select_edicion_proveedor").value)
                    })
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((id) => {
                if (id > 0) {
                    cleanFromUsuario()
                    htmlEditarProveedor()
                    hiddenForms();
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    } else {
        ipcRenderer.send('showAlert', "warning", "Falta algun campo necesario")
    }
}

function actualizarTransportista() {
    if (
        input_form_usuario_cedula.value != "" &&
        input_form_usuario_nombres.value != "" &&
        input_form_usuario_apellidos.value != "" &&
        !isNaN(parseInt(select_form_usuario_activo.value)) &&
        !isNaN(parseInt(select_form_transportista_activo.value)) &&
        !isNaN(parseInt(document.getElementById("select_edicion_transportista").value))
    ) {
        getTransportista(document.getElementById("select_edicion_transportista").value)
            .then((rows) => {
                let { id_persona } = rows[0]
                return updatePersona({
                    activo: parseInt(select_form_usuario_activo.value),
                    cedula: input_form_usuario_cedula.value,
                    nombres: input_form_usuario_nombres.value,
                    apellidos: input_form_usuario_apellidos.value,
                    fecha_nacimiento: input_form_usuario_fecha_nacimiento.value == "" ? null : input_form_usuario_fecha_nacimiento.value,
                    sexo: select_form_usuario_sexo.value == "" ? null : select_form_usuario_sexo.value,
                    estado_civil: select_form_usuario_estado_civil.value == "" ? null : select_form_usuario_estado_civil.value,
                    ciudadania: input_form_usuario_ciudadania.value == "" ? null : input_form_usuario_ciudadania.value,
                    instruccion: input_form_usuario_instruccion.value == "" ? null : input_form_usuario_instruccion.value,
                    lugar_expedicion: input_form_usuario_lugar_expedicion.value == "" ? null : input_form_usuario_lugar_expedicion.value,
                    fecha_expedicion: input_form_usuario_fecha_expedicion.value == "" ? null : input_form_usuario_fecha_expedicion.value,
                    fecha_expiracion: input_form_usuario_fecha_expiracion.value == "" ? null : input_form_usuario_fecha_expiracion.value,
                    id_persona: id_persona
                })
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((files) => {
                if (files > 0) {
                    return updateTransportista({
                        activo: parseInt(select_form_transportista_activo.value),
                        vencimiento_licencia: input_form_transportista_fecha_vencimiento.value == "" ? null : input_form_transportista_fecha_vencimiento.value,
                        id_transportista: parseInt(document.getElementById("select_edicion_transportista").value)
                    })
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            }).then((id) => {
                if (id > 0) {
                    cleanFromUsuario()
                    htmlEditarTransportista()
                    hiddenForms();
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    } else {
        ipcRenderer.send('showAlert', "warning", "Falta algun campo necesario")
    }
}


function actualizarVehiculo() {
    if (
        input_form_vehiculo_placa.value != "" &&
        !isNaN(parseInt(select_form_vehiculo_activo.value)) &&
        !isNaN(parseInt(select_form_vehiculo_transportista.value)) &&
        !isNaN(parseInt(select_form_vehiculo_tipo_vehiculo.value)) &&
        !isNaN(parseInt(document.getElementById("select_edicion_vehiculo").value))
    ) {
        updateVehiculo({
            placa: input_form_vehiculo_placa.value,
            vencimiento_matricula: input_form_vehiculo_fecha_vencimiento_matricula.value == "" ? null : input_form_vehiculo_fecha_vencimiento_matricula.value,
            activo: parseInt(select_form_vehiculo_activo.value),
            id_transportista: parseInt(select_form_vehiculo_transportista.value),
            id_tipo_vehiculo: parseInt(select_form_vehiculo_tipo_vehiculo.value),
            id_vehiculo: parseInt(document.getElementById("select_edicion_vehiculo").value)
        }).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                hiddenForms()
                htmlEditarVehiculo()
                form_edicion.classList.remove("d-none")
                ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm.toString())
        })

    } else {
        ipcRenderer.send('showAlert', "warning", "Falta algun campo necesario")
    }
}

function actualizarFormaRecepcion() {
    let id = document.getElementById("select_edicion_forma_recepcion").value
    if (input_form_forma_recepcion_nombre.value != "" && !isNaN(Number(id))) {
        updateFormaRecepcion({
            nombre: input_form_forma_recepcion_nombre.value,
            id_forma_recepcion: id
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarFormaRecepcion()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarLinea() {
    let id = document.getElementById("select_edicion_linea").value
    if (input_form_linea_nombre.value != "" && !isNaN(Number(id))) {
        updateLinea({
            nombre: input_form_linea_nombre.value,
            id_linea: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarLinea()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarMaterial() {
    let id = document.getElementById("select_edicion_material").value
    if (input_form_material_nombre.value != "" && !isNaN(Number(id)) && !isNaN(select_form_material_proceso.value)) {
        updateMaterial({
            nombre: input_form_material_nombre.value,
            id_proceso: Number(select_form_material_proceso.value),
            id_material: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarMaterial()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarProceso() {
    let id = document.getElementById("select_edicion_proceso").value
    if (input_form_proceso_nombre.value != "" && !isNaN(Number(id)) && !isNaN(select_form_proceso_linea.value)) {
        updateProceso({
            nombre: input_form_proceso_nombre.value,
            id_linea: Number(select_form_proceso_linea.value),
            id_proceso: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarProceso()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarTipoMaterial() {
    let id = document.getElementById("select_edicion_tipo_material").value
    if (input_form_tipo_material_nombre.value != "" && !isNaN(Number(id)) && !isNaN(select_form_tipo_material_material.value)) {
        updateTipoMaterial({
            nombre: input_form_tipo_material_nombre.value,
            id_material: Number(select_form_tipo_material_material.value),
            id_tipo_material: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarTipoMaterial()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarTipoVehiculo() {
    let id = document.getElementById("select_edicion_tipo_vehiculo").value
    if (input_form_tipo_vehiculo_nombre.value != "" && !isNaN(Number(id))) {
        updateTipoVehiculo({
            nombre: input_form_tipo_vehiculo_nombre.value,
            id_tipo_vehiculo: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarTipoVehiculo()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}

function actualizarTipoContaminacion() {
    let id = document.getElementById("select_edicion_tipo_contaminacion").value
    if (input_form_tipo_contaminacion_nombre.value != "" && !isNaN(Number(id))) {
        updateTipoContaminacion({
            nombre: input_form_tipo_contaminacion_nombre.value,
            id_tipo_contaminacion: Number(id)
        })
            .then((filas_afectadas) => {
                if (filas_afectadas > 0) {
                    hiddenForms()
                    htmlEditarTipoContaminacion()
                    form_edicion.classList.remove("d-none")
                    ipcRenderer.send('showAlert', "success", "Actualizacion exitosa")
                }
            }).catch((msm) => {
                ipcRenderer.send('showAlert', "error", msm.toString())
            })
    }
}


function cleanFromUsuario() {
    input_form_usuario_cedula.value = ""
    input_form_usuario_apellidos.value = ""
    input_form_usuario_nombres.value = ""
    input_form_usuario_fecha_nacimiento.value = ""
    select_form_usuario_sexo.value = ""
    select_form_usuario_estado_civil.value = ""
    input_form_usuario_ciudadania.value = ""
    input_form_usuario_instruccion.value = ""
    input_form_usuario_lugar_expedicion.value = ""
    input_form_usuario_fecha_expedicion.value = ""
    input_form_usuario_fecha_expiracion.value = ""
    input_form_credencial_contrasena.value = ""
    input_form_credencial_usuario.value = ""
}

function formEdicionUsuario() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_usuario").value
    if (!isNaN(parseInt(id))) {
        getPersona(id)
            .then(({ cedula, nombres, apellidos, fecha_nacimiento, sexo, estado_civil, ciudadania, instruccion, lugar_expedicion, fecha_expedicion, fecha_expiracion, password_user, user, activo }) => {
                input_form_usuario_cedula.value = cedula == null ? "" : cedula
                input_form_usuario_apellidos.value = apellidos == null ? "" : apellidos
                input_form_usuario_nombres.value = nombres == null ? "" : nombres
                input_form_usuario_fecha_nacimiento.value = fecha_nacimiento == null ? "" : fecha_nacimiento.getFullYear() + "-" + ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_nacimiento.getDate()).slice(-2)
                select_form_usuario_sexo.value = sexo == null ? "" : sexo
                select_form_usuario_estado_civil.value = estado_civil == null ? "" : estado_civil
                input_form_usuario_ciudadania.value = ciudadania == null ? "" : ciudadania
                input_form_usuario_instruccion.value = instruccion == null ? "" : instruccion
                input_form_usuario_lugar_expedicion.value = lugar_expedicion == null ? "" : lugar_expedicion
                input_form_usuario_fecha_expedicion.value = fecha_expedicion == null ? "" : fecha_expedicion.getFullYear() + "-" + ("0" + (fecha_expedicion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expedicion.getDate()).slice(-2)
                input_form_usuario_fecha_expiracion.value = fecha_expiracion == null ? "" : fecha_expiracion.getFullYear() + "-" + ("0" + (fecha_expiracion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expiracion.getDate()).slice(-2)
                input_form_credencial_contrasena.value = password_user == null ? "" : password_user
                input_form_credencial_usuario.value = user == null ? "" : user
                select_form_usuario_activo.value = activo == null ? "" : activo
                form_persona.classList.remove("d-none")
                form_credencial.classList.remove("d-none")
                boton_form_credencial_registrar.innerHTML = "Actualizar"
            })
    }
}

function formEdicionProveedor() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_proveedor").value
    if (!isNaN(parseInt(id))) {
        getProveedor(id)
            .then((array) => {
                let { cedula, nombres, apellidos, fecha_nacimiento, sexo, estado_civil, ciudadania, instruccion, lugar_expedicion, fecha_expedicion, fecha_expiracion, activo_persona, activo_proveedor } = array[0]
                input_form_usuario_cedula.value = cedula == null ? "" : cedula
                input_form_usuario_apellidos.value = apellidos == null ? "" : apellidos
                input_form_usuario_nombres.value = nombres == null ? "" : nombres
                input_form_usuario_fecha_nacimiento.value = fecha_nacimiento == null ? "" : fecha_nacimiento.getFullYear() + "-" + ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_nacimiento.getDate()).slice(-2)
                select_form_usuario_sexo.value = sexo == null ? "" : sexo
                select_form_usuario_estado_civil.value = estado_civil == null ? "" : estado_civil
                input_form_usuario_ciudadania.value = ciudadania == null ? "" : ciudadania
                input_form_usuario_instruccion.value = instruccion == null ? "" : instruccion
                input_form_usuario_lugar_expedicion.value = lugar_expedicion == null ? "" : lugar_expedicion
                input_form_usuario_fecha_expedicion.value = fecha_expedicion == null ? "" : fecha_expedicion.getFullYear() + "-" + ("0" + (fecha_expedicion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expedicion.getDate()).slice(-2)
                input_form_usuario_fecha_expiracion.value = fecha_expiracion == null ? "" : fecha_expiracion.getFullYear() + "-" + ("0" + (fecha_expiracion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expiracion.getDate()).slice(-2)
                select_form_usuario_activo.value = activo_persona == null ? "" : activo_persona
                select_form_proveedor_activo.value = activo_proveedor == null ? "" : activo_proveedor
                form_persona.classList.remove("d-none")
                form_proveedor.classList.remove("d-none")
            })
    }
}

function formEdicionTransportista() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_transportista").value
    if (!isNaN(parseInt(id))) {
        getTransportista(id)
            .then((array) => {
                let { cedula, nombres, apellidos, fecha_nacimiento, sexo, estado_civil, ciudadania, instruccion, lugar_expedicion, fecha_expedicion, fecha_expiracion, activo_persona, activo_transportista, vencimiento_licencia } = array[0]
                input_form_usuario_cedula.value = cedula == null ? "" : cedula
                input_form_usuario_apellidos.value = apellidos == null ? "" : apellidos
                input_form_usuario_nombres.value = nombres == null ? "" : nombres
                input_form_usuario_fecha_nacimiento.value = fecha_nacimiento == null ? "" : fecha_nacimiento.getFullYear() + "-" + ("0" + (fecha_nacimiento.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_nacimiento.getDate()).slice(-2)
                select_form_usuario_sexo.value = sexo == null ? "" : sexo
                select_form_usuario_estado_civil.value = estado_civil == null ? "" : estado_civil
                input_form_usuario_ciudadania.value = ciudadania == null ? "" : ciudadania
                input_form_usuario_instruccion.value = instruccion == null ? "" : instruccion
                input_form_usuario_lugar_expedicion.value = lugar_expedicion == null ? "" : lugar_expedicion
                input_form_usuario_fecha_expedicion.value = fecha_expedicion == null ? "" : fecha_expedicion.getFullYear() + "-" + ("0" + (fecha_expedicion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expedicion.getDate()).slice(-2)
                input_form_usuario_fecha_expiracion.value = fecha_expiracion == null ? "" : fecha_expiracion.getFullYear() + "-" + ("0" + (fecha_expiracion.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_expiracion.getDate()).slice(-2)
                select_form_usuario_activo.value = activo_persona == null ? "" : activo_persona
                select_form_transportista_activo.value = activo_transportista == null ? "" : activo_transportista
                input_form_transportista_fecha_vencimiento.value = vencimiento_licencia == null ? "" : vencimiento_licencia.getFullYear() + "-" + ("0" + (vencimiento_licencia.getMonth() + 1)).slice(-2) + "-" + ("0" + vencimiento_licencia.getDate()).slice(-2)
                form_persona.classList.remove("d-none")
                form_transportista.classList.remove("d-none")
            })
    }
}

function formEdicionVehiculo() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_vehiculo").value
    if (!isNaN(parseInt(id))) {
        getVehiculo(id)
            .then((array) => {
                let { placa, vencimiento_matricula, activo, id_transportista, id_tipo_vehiculo } = array[0]
                input_form_vehiculo_placa.value = placa,
                    input_form_vehiculo_fecha_vencimiento_matricula.value = vencimiento_matricula == null ? "" : vencimiento_matricula.getFullYear() + "-" + ("0" + (vencimiento_matricula.getMonth() + 1)).slice(-2) + "-" + ("0" + vencimiento_matricula.getDate()).slice(-2)
                select_form_vehiculo_activo.value = activo == null ? "" : activo
                select_form_vehiculo_tipo_vehiculo.value = id_tipo_vehiculo
                select_form_vehiculo_transportista.value = id_transportista
                form_vehiculo.classList.remove("d-none")
            })
    }
}

function formEdicionLinea() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_linea").value
    if (!isNaN(parseInt(id))) {
        getLinea(id)
            .then((array) => {
                let { nombre } = array[0]
                input_form_linea_nombre.value = nombre == null ? "" : nombre
                form_linea.classList.remove("d-none")
            })
    }
}

function formEdicionProceso() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_proceso").value
    if (!isNaN(parseInt(id))) {
        getProceso(id)
            .then((array) => {
                let { nombre, id_linea } = array[0]
                select_form_proceso_linea.value = id_linea
                input_form_proceso_nombre.value = nombre == null ? "" : nombre
                form_proceso.classList.remove("d-none")
            })
    }
}

function formEdicionMaterial() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_material").value
    if (!isNaN(parseInt(id))) {
        getMaterial(id)
            .then((array) => {
                let { nombre, id_proceso } = array[0]
                select_form_material_proceso.value = id_proceso
                input_form_material_nombre.value = nombre == null ? "" : nombre
                form_material.classList.remove("d-none")
            })
    }
}

function formEdicionTipoMaterial() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_tipo_material").value
    if (!isNaN(parseInt(id))) {
        getTipoMaterial(id)
            .then((array) => {
                let { nombre, id_material } = array[0]
                select_form_tipo_material_material.value = id_material
                input_form_tipo_material_nombre.value = nombre == null ? "" : nombre
                form_tipo_material.classList.remove("d-none")
            })
    }
}

function formEdicionTipoVehiculo() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_tipo_vehiculo").value
    if (!isNaN(parseInt(id))) {
        getTipoVehiculo(id)
            .then((array) => {
                let { nombre } = array[0]
                input_form_tipo_vehiculo_nombre.value = nombre == null ? "" : nombre
                form_tipo_vehiculo.classList.remove("d-none")
            })
    }
}

function formEdicionTipoContaminacion() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_tipo_contaminacion").value
    if (!isNaN(parseInt(id))) {
        getTipoContaminacion(id)
            .then((array) => {
                let { nombre } = array[0]
                input_form_tipo_contaminacion_nombre.value = nombre == null ? "" : nombre
                form_tipo_contaminacion.classList.remove("d-none")
            })
    }
}

function formEdicionFormaRecepcion() {
    hiddenForms();
    form_edicion.classList.remove("d-none")
    let id = document.getElementById("select_edicion_forma_recepcion").value
    if (!isNaN(parseInt(id))) {
        getFormaRecepcion(id)
            .then((array) => {
                let { nombre } = array[0]
                input_form_forma_recepcion_nombre.value = nombre == null ? "" : nombre
                form_forma_recepcion.classList.remove("d-none")
            })
    }
}


function llenarSelectLinea() {
    let html = "<option selected>Open this select menu</option>";
    getAllLinea().then((array_lineas) => {
        array_lineas.map(({ id_linea, nombre }) => {
            html += `<option value="${id_linea}">${nombre}</option>`
        });
        switch (select_opcion.value) {
            case "PROCESO":
                select_form_proceso_linea.innerHTML = html;
                break;
            case "MATERIAL":
                select_form_material_linea.innerHTML = html;
                break;
            case "TIPO_MATERIAL":
                select_form_tipo_material_linea.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
                select_form_peso_linea.innerHTML = html;
                break;
            case "EDI_PROCESO":
                select_form_proceso_linea.innerHTML = html;
                break;
            case "EDI_MATERIAL":
                select_form_material_linea.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                select_form_tipo_material_linea.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectProceso() {
    let html = "<option selected>Open this select menu</option>";
    getAllProceso().then((array_procesos) => {
        switch (select_opcion.value) {
            case "MATERIAL":
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (id_linea == select_form_material_linea.value) html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_material_proceso.innerHTML = html;
                break;
            case "TIPO_MATERIAL":
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (id_linea == select_form_tipo_material_linea.value) html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_tipo_material_proceso.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (!isNaN(Number(select_form_peso_linea.value))) {
                        select_form_peso_material.setAttribute("disabled", "")
                        select_form_peso_tipo_material.setAttribute("disabled", "")
                        if (id_linea == Number(select_form_peso_linea.value)) html += `<option value="${id_proceso}">${nombre}</option>`
                    } else {
                        html += `<option value="${id_proceso}">${nombre}</option>`
                    }
                })
                select_form_peso_proceso.innerHTML = html;
                break;
            case "EDI_PROCESO":
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (id_linea == document.getElementById("select_edicion_linea").value) html += `<option value="${id_proceso}">${nombre}</option>`
                })
                document.getElementById("select_edicion_proceso").removeAttribute("disabled")
                document.getElementById("boton_edicion_eliminar").removeAttribute("disabled")
                document.getElementById("select_edicion_proceso").innerHTML = html;
                break;
            case "EDI_MATERIAL":
                form_material.classList.add("d-none")
                select_form_material_linea.value = document.getElementById("select_edicion_linea").value
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (id_linea == document.getElementById("select_edicion_linea").value) html += `<option value="${id_proceso}">${nombre}</option>`
                })
                document.getElementById("select_edicion_proceso").removeAttribute("disabled")
                document.getElementById("select_edicion_proceso").innerHTML = html;
                select_form_material_proceso.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                form_tipo_material.classList.add("d-none")
                select_form_tipo_material_linea.value = document.getElementById("select_edicion_linea").value
                array_procesos.map(({ id_proceso, id_linea, nombre }) => {
                    if (id_linea == document.getElementById("select_edicion_linea").value) html += `<option value="${id_proceso}">${nombre}</option>`
                })
                document.getElementById("select_edicion_proceso").removeAttribute("disabled")
                document.getElementById("select_edicion_proceso").innerHTML = html;
                select_form_tipo_material_proceso.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectMaterial() {
    let html = "<option selected>Open this select menu</option>";
    getAllMaterial().then((array_material) => {
        switch (select_opcion.value) {
            case "MATERIAL":
                array_material.map(({ id_proceso, id_material, nombre }) => {
                    if (id_proceso == select_form_material_proceso.value) html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_material_material.innerHTML = html;
                break;
            case "TIPO_MATERIAL":
                array_material.map(({ id_proceso, id_material, nombre }) => {
                    if (id_proceso == select_form_tipo_material_proceso.value) html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_tipo_material_material.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
                array_material.map(({ id_material, id_proceso, nombre }) => {
                    if (!isNaN(Number(select_form_peso_proceso.value))) {
                        select_form_peso_material.removeAttribute("disabled", "")
                        select_form_peso_tipo_material.setAttribute("disabled", "")
                        if (id_proceso == Number(select_form_peso_proceso.value)) html += `<option value="${id_material}">${nombre}</option>`
                    } else {
                        html += `<option value="${id_material}">${nombre}</option>`
                    }
                })
                select_form_peso_material.innerHTML = html;
                break;
            case "EDI_MATERIAL":
                form_material.classList.add("d-none")
                select_form_material_proceso.value = document.getElementById("select_edicion_proceso").value
                array_material.map(({ id_proceso, id_material, nombre }) => {
                    if (id_proceso == document.getElementById("select_edicion_proceso").value) html += `<option value="${id_material}">${nombre}</option>`
                })
                document.getElementById("select_edicion_material").removeAttribute("disabled")
                document.getElementById("boton_edicion_eliminar").removeAttribute("disabled")
                document.getElementById("select_edicion_material").innerHTML = html;
                select_form_tipo_material_proceso.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                form_tipo_material.classList.add("d-none")
                select_form_tipo_material_proceso.value = document.getElementById("select_edicion_proceso").value
                array_material.map(({ id_proceso, id_material, nombre }) => {
                    if (id_proceso == document.getElementById("select_edicion_proceso").value) html += `<option value="${id_material}">${nombre}</option>`
                })
                document.getElementById("select_edicion_material").removeAttribute("disabled")
                document.getElementById("select_edicion_material").innerHTML = html;
                select_form_tipo_material_material.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectTipoMaterial() {
    let html = "<option selected>Open this select menu</option>";
    getAllTipoMaterial().then((array_tipo_material) => {
        switch (select_opcion.value) {
            case "EDI_TICKET_PESO":
                array_tipo_material.map(({ id_tipo_material, id_material, nombre }) => {
                    if (!isNaN(Number(select_form_peso_material.value))) {
                        select_form_peso_tipo_material.removeAttribute("disabled")
                        if (id_material == Number(select_form_peso_material.value)) html += `<option value="${id_tipo_material}">${nombre}</option>`
                    } else {
                        html += `<option value="${id_tipo_material}">${nombre}</option>`
                    }

                })
                select_form_peso_tipo_material.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                array_tipo_material.map(({ id_tipo_material, id_material, nombre }) => {
                    if (id_material == Number(document.getElementById("select_edicion_material").value)) html += `<option value="${id_tipo_material}">${nombre}</option>`
                })
                document.getElementById("select_edicion_tipo_material").removeAttribute("disabled")
                document.getElementById("boton_edicion_eliminar").removeAttribute("disabled")
                document.getElementById("select_edicion_tipo_material").innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectTransportista() {
    let html = "<option selected>Open this select menu</option>";
    getAllTransportista().then((array_transportista) => {
        array_transportista.map(({ id_transportista, nombre }) => {
            html += `<option value="${id_transportista}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "VEHICULO":
                select_form_vehiculo_transportista.innerHTML = html;
                break;
            case "EDI_VEHICULO":
                select_form_vehiculo_transportista.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
                select_form_ticket_transportista.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectProveedor() {
    let html = "<option selected>Open this select menu</option>";
    getAllProveedor().then((array_proveedor) => {
        array_proveedor.map(({ id_proveedor, nombre }) => {
            html += `<option value="${id_proveedor}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "EDI_TICKET_PESO":
                select_form_ticket_proveedor.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectTipoContaminacion() {
    let html = "<option selected>Open this select menu</option>";
    getAllTipoContaminacion().then((array_tipos) => {
        array_tipos.map(({ id_tipo_contaminacion, nombre }) => {
            html += `<option value="${id_tipo_contaminacion}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "EDI_TICKET_PESO":
                select_form_peso_contaminacion.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectTipoVehiculo() {
    let html = "<option selected>Open this select menu</option>";
    getAllTipoVehiculo().then((array_tipoVehiculo) => {
        array_tipoVehiculo.map(({ id_tipo_vehiculo, nombre }) => {
            html += `<option value="${id_tipo_vehiculo}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "VEHICULO":
                select_form_vehiculo_tipo_vehiculo.innerHTML = html;
                break;
            case "EDI_VEHICULO":
                select_form_vehiculo_tipo_vehiculo.innerHTML = html;
                break;
            default:
                break;
        }
    })
}



function llenarSelectFormaRecepcion() {
    let html = "<option selected>Open this select menu</option>";
    getAllFormaRecepcion().then((array_formas) => {
        array_formas.map(({ id_forma_recepcion, nombre }) => {
            html += `<option value="${nombre}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "EDI_TICKET_PESO":
                select_form_peso_forma_recepcion.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectVehiculo() {
    let html = "<option selected>Open this select menu</option>";
    getAllVehiculo().then((array_vehiculos) => {

        switch (select_opcion.value) {
            case "EDI_TICKET_PESO":
                array_vehiculos.map(({ id_vehiculo, placa }) => {
                    html += `<option value="${id_vehiculo}">${placa}</option>`
                })
                select_form_ticket_vehiculo.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function htmlTicketPeso() {
    let html = `  <label for="inputEmail4" class="form-label col-sm-3 mb-2">Estado de ticket</label><div class="col-9 mb-2">
        <select class="form-select" onchange="fillIdTicket()" aria-label="Default select example" id="select_edicion_estado_ticket">
            <option selected>Open this select menu</option>
            <option value="1">PROCESADO</option>
            <option value="0">NO PROCESADO</option>
        </select>
    </div>`;
    html += `<label for="inputEmail4" class="form-label col-sm-3">Nro. Ticket</label><div class="col-9">
    <select class="form-select" aria-label="Default select example" onchange="htmlUpdateTicket()" id="select_edicion_numero_ticket" disabled>
        <option selected>Open this select menu</option>
        <option value="1">PROCESADO</option>
        <option value="0">NO PROCESADO</option>
    </select>
    </div>`
    form_edicion.innerHTML = html;
}

function fillIdTicket() {
    let html = "<option selected>Open this select menu</option>"
    let procesadose = document.getElementById("select_edicion_estado_ticket").value
    getAllTicket().then((array_tickets) => {
        array_tickets.map(({ procesado, id_ticket }) => {
            if (Number(procesadose) == procesado) html += `<option value="${id_ticket}">${id_ticket}</option>`
        });
        document.getElementById("select_edicion_numero_ticket").innerHTML = html;
        document.getElementById("select_edicion_numero_ticket").removeAttribute("disabled")
    })

}

function htmlUpdateTicket() {
    hiddenForms();
    let id_ticket_select = document.getElementById("select_edicion_numero_ticket").value
    if (!isNaN(Number(id_ticket_select))) {
        form_ticket.classList.remove("d-none");
        form_edicion.classList.remove("d-none")
        getTicket(id_ticket_select).then((array_ticket) => {
            array_ticket.map(({ fecha_ticket, observaciones, procesado, fecha_procesado, id_vehiculo, id_proveedor }) => {
                input_form_ticket_fecha.value = fecha_ticket.getFullYear() + "-" + ('0' + (fecha_ticket.getMonth() + 1)).slice(-2) + "-" + ('0' + fecha_ticket.getDate()).slice(-2) + "T" + ("0" + fecha_ticket.getHours()).slice(-2) + ":" + ("0" + fecha_ticket.getMinutes()).slice(-2) + ":" + ("0" + fecha_ticket.getSeconds()).slice(-2);
                select_form_ticket_procesado.value = procesado
                input_form_ticket_fecha_procesado.value = fecha_procesado == null ? "" : fecha_procesado.getFullYear() + "-" + ('0' + (fecha_procesado.getMonth() + 1)).slice(-2) + "-" + ('0' + fecha_procesado.getDate()).slice(-2) + "T" + ("0" + fecha_procesado.getHours()).slice(-2) + ":" + ("0" + fecha_procesado.getMinutes()).slice(-2) + ":" + ("0" + fecha_procesado.getSeconds()).slice(-2);;
                select_form_ticket_vehiculo.value = id_vehiculo
                select_form_ticket_proveedor.value = id_proveedor
                texttarea_form_ticket_observaciones.value = observaciones
            });

            llenarPesos();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "danger", msm)
        })
    }
}

function llenarPesos() {
    let html = ""
    let id_ticket_select = document.getElementById("select_edicion_numero_ticket").value
    getAllPeso().then((array_pesos) => {
        array_pesos.map(({ id_peso, tipo_peso, peso, peso_contaminacion, porcentaje_contaminacion, peso_total, fecha_hora, id_ticket }) => {
            if (Number(id_ticket_select) == id_ticket) {
                html += `<tr>
                    <th scope="row">${id_peso}</th>
                    <td>${tipo_peso}</td>
                    <td>${peso}</td>
                    <td>${peso_contaminacion == null ? 0 : peso_contaminacion}</td>
                    <td>${porcentaje_contaminacion == null ? 0 : porcentaje_contaminacion}</td>
                    <td>${peso_total == null ? 0 : peso_total}</td>
                    <td><button class="btn btn-warning" onclick=" htmlupdatePeso(${id_peso})"> @ </button></td>
                    <td><button class="btn btn-danger" onclick="eliminarPeso(${id_peso})"> X </button></td>
                   </tr>`
            }
        })
        body_table_form_ticket_peso.innerHTML = html
    }).catch((msm) => {
        ipcRenderer.send('showAlert', "danger", msm)
    })
}

function eliminarPeso(id) {
    deletePeso(id).then((filas_afectadas) => {
        if (filas_afectadas > 0) ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
        llenarPesos();
    }).catch((msm) => {
        ipcRenderer.send('showAlert', "danger", msm)
    })
}

function htmlupdatePeso(id) {
    hiddenForms();
    form_peso.classList.remove("d-none")
    form_edicion.classList.remove("d-none")
    getPeso(id).then((array_peso) => {
        array_peso.map(({ id_peso, id_linea, id_proceso, id_material, tipo_peso, forma_recepcion, peso, peso_contaminacion, porcentaje_contaminacion, peso_total, fecha_hora, id_ticket, id_tipo_material }) => {
            input_form_peso_id_peso.value = id_peso
            select_form_peso_tipo_peso.value = tipo_peso
            select_form_peso_forma_recepcion.value = forma_recepcion
            input_form_peso_peso.value = peso
            input_form_peso_contaminacion.value = peso_contaminacion == null ? 0 : peso_contaminacion
            input_form_peso_porcentaje_contaminacion.value = porcentaje_contaminacion == null ? 0 : porcentaje_contaminacion
            input_form_peso_total.value = peso_total == null ? 0 : peso_total
            input_form_peso_fecha.value = fecha_hora.getFullYear() + "-" + ('0' + (fecha_hora.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_hora.getDate()).slice(-2) + "T" + ("0" + fecha_hora.getHours()).slice(-2) + ":" + ("0" + fecha_hora.getMinutes()).slice(-2) + ":" + ("0" + fecha_hora.getSeconds()).slice(-2);
            if (tipo_peso == "ENTRADA") {
                select_form_peso_linea.setAttribute("disabled", "")
                select_form_peso_proceso.setAttribute("disabled", "")
                select_form_peso_material.setAttribute("disabled", "")
                select_form_peso_tipo_material.setAttribute("disabled", "")
                input_form_peso_contaminacion.setAttribute("disabled", "")
                input_form_peso_porcentaje_contaminacion.setAttribute("disabled", "")
                input_form_peso_total.setAttribute("disabled", "")
                select_form_peso_contaminacion.setAttribute("disabled", "")
                boton_form_peso_contaminacion.setAttribute("disabled", "")
            } else {
                select_form_peso_linea.removeAttribute("disabled")
                select_form_peso_proceso.removeAttribute("disabled")
                select_form_peso_material.removeAttribute("disabled")
                select_form_peso_tipo_material.removeAttribute("disabled")
                input_form_peso_contaminacion.removeAttribute("disabled", "")
                input_form_peso_porcentaje_contaminacion.removeAttribute("disabled", "")
                input_form_peso_total.removeAttribute("disabled", "")
                select_form_peso_contaminacion.removeAttribute("disabled", "")
                boton_form_peso_contaminacion.removeAttribute("disabled", "")
            }
            select_form_peso_tipo_material.value = id_tipo_material
            select_form_peso_linea.value = id_linea
            select_form_peso_proceso.value = id_proceso
            select_form_peso_material.value = id_material
        })
        form_peso.classList.remove("d-none")
        llenarContaminacion();
    }).catch((msm) => {
        if (msm) ipcRenderer.send('showAlert', "danger", msm.toString())
        if (!msm) ipcRenderer.send('showAlert', "danger", "Hubo problemas al cargar la info del peso")
    })
}

function llenarContaminacion() {
    let id = input_form_peso_id_peso.value
    let html = ""
    getAllContaminacion().then((array_contaminaciones) => {
        array_contaminaciones.map(({ id_peso, id_contaminacion, nombre }) => {
            if (id_peso == id) {
                html += `
                <a href="#" class="list-group-item list-group-item-action" onclick="eliminarContaminacion(${id_contaminacion})" aria-current="true">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${nombre}
                    <span class="badge bg-danger rounded-pill">-</span>
                  </li>
               </a>`
            }
        })
        lista_form_peso_contaminaciones.innerHTML = html
    }).catch((msm) => {
        ipcRenderer.send('showAlert', "danger", msm.toString())
    })
}

function agregarContaminacion() {
    if (!isNaN(Number(select_form_peso_contaminacion.value)) && !isNaN(Number(input_form_peso_id_peso.value))) {
        insertContaminacion({
            id_tipo_contaminacion: Number(select_form_peso_contaminacion.value),
            id_peso: Number(input_form_peso_id_peso.value)
        }).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                llenarContaminacion();
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "danger", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Escoja un tipo de contaminacion")
    }

}

function eliminarContaminacion(id) {
    deleteContaminacion(id).then((filas_afectadas) => {
        if (filas_afectadas > 0) llenarContaminacion()
    }).catch((msm) => {
        ipcRenderer.send('showAlert', "danger", msm.toString())
    })
}

function desbloquearConfi() {
    if (select_form_peso_tipo_peso.value == "SALIDA") {
        select_form_peso_linea.removeAttribute("disabled")
        select_form_peso_proceso.removeAttribute("disabled")
        select_form_peso_material.removeAttribute("disabled")
        select_form_peso_tipo_material.removeAttribute("disabled")
        input_form_peso_contaminacion.removeAttribute("disabled", "")
        input_form_peso_porcentaje_contaminacion.removeAttribute("disabled", "")
        input_form_peso_total.removeAttribute("disabled", "")
        select_form_peso_contaminacion.removeAttribute("disabled", "")
        boton_form_peso_contaminacion.removeAttribute("disabled", "")
    } else {
        select_form_peso_linea.setAttribute("disabled", "")
        select_form_peso_proceso.setAttribute("disabled", "")
        select_form_peso_material.setAttribute("disabled", "")
        select_form_peso_tipo_material.setAttribute("disabled", "")
        input_form_peso_contaminacion.setAttribute("disabled", "")
        input_form_peso_porcentaje_contaminacion.setAttribute("disabled", "")
        input_form_peso_total.setAttribute("disabled", "")
        select_form_peso_contaminacion.setAttribute("disabled", "")
        boton_form_peso_contaminacion.setAttribute("disabled", "")
    }
}

function actualizarTicket() {
    if (
        !isNaN(Number(select_form_ticket_procesado.value)) &&
        !isNaN(Number(document.getElementById("select_edicion_numero_ticket").value)) &&
        !isNaN(Number(select_form_ticket_vehiculo.value)) &&
        !isNaN(Number(select_form_ticket_proveedor.value))
    ) {
        updateTicket({
            fecha_ticket: input_form_ticket_fecha.value,
            observaciones: texttarea_form_ticket_observaciones.value == "" ? null : texttarea_form_ticket_observaciones.value,
            procesado: Number(select_form_ticket_procesado.value),
            fecha_procesado: input_form_ticket_fecha_procesado.value,
            id_vehiculo: Number(select_form_ticket_vehiculo.value),
            id_proveedor: Number(select_form_ticket_proveedor.value),
            id_empresa: 1,
            id_ticket: Number(document.getElementById("select_edicion_numero_ticket").value)
        }).then((filas_afectadas) => {
            if (filas_afectadas > 0) ipcRenderer.send('showAlert', "success", "Ticket actualizado")
            htmlUpdateTicket();
        }).catch((msm) => {
            if (msm) ipcRenderer.send('showAlert', "Error", msm)
            if (!msm) ipcRenderer.send('showAlert', "Error", "No se pudo actualizar el ticket")
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Campos vacios")
    }
}

function reimpresion() {
    if (!isNaN(Number(document.getElementById("select_edicion_numero_ticket").value))) {
        ipcRenderer.send('reimprimir', Number(document.getElementById("select_edicion_numero_ticket").value))
    } else {
        ipcRenderer.send('showAlert', "warning", "Ticket no escojido")
    }
}

function eliminarTicket() {
    let id = Number(document.getElementById("select_edicion_numero_ticket").value)
    deleteTicket(id).then((filas_afectadas) => {
        if (filas_afectadas > 0) ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
        location.reload();
    }).catch((msm) => {
        ipcRenderer.send('showAlert', "danger", msm.toString())
    })
}

function actualizarPeso() {
    if (
        select_form_peso_tipo_peso.value != "" &&
        select_form_peso_forma_recepcion.value != "" &&
        !isNaN(Number(input_form_peso_peso.value)) &&
        !isNaN(Number(select_form_peso_tipo_material.value)) &&
        !isNaN(Number(document.getElementById("select_edicion_numero_ticket").value)) &&
        input_form_peso_fecha.value != "" &&
        !isNaN(Number(input_form_peso_id_peso.value))
    ) {
        updatePeso({
            tipo_peso: select_form_peso_tipo_peso.value,
            forma_recepcion: select_form_peso_forma_recepcion.value,
            peso: Number(input_form_peso_peso.value),
            peso_contaminacion: input_form_peso_contaminacion.value == "" ? 0 : input_form_peso_contaminacion.value,
            porcentaje_contaminacion: input_form_peso_porcentaje_contaminacion.value == "" ? 0 : input_form_peso_porcentaje_contaminacion.value,
            peso_total: input_form_peso_total.value == "" ? 0 : input_form_peso_total.value,
            fecha_hora: input_form_peso_fecha.value,
            id_ticket: Number(document.getElementById("select_edicion_numero_ticket").value),
            id_tipo_material: Number(select_form_peso_tipo_material.value),
            id_peso: Number(input_form_peso_id_peso.value)
        }).then((filas_afectadas) => {
            if (filas_afectadas > 0) ipcRenderer.send('showAlert', "success", "Peso actualizado exitosamente")
            htmlUpdateTicket();
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "danger", msm.toString())
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Existen campos vacios")
    }
}

function linkTransportista() {
    toggleAviso("hidden");
    hiddenForms();
    form_persona.classList.remove("d-none");
    form_transportista.classList.remove("d-none")
}

function linkTipoVehiculo() {
    toggleAviso("hidden");
    hiddenForms();
    form_tipo_vehiculo.classList.remove("d-none");
}

function personaExistente() {
    let html = ` <div class="col">
    <label for="inputEmail4" class="form-label" id="label_select_edicion">Personas Registradas</label>
    <select class="form-select" aria-label="Default select example" id="select_edicion_persona"> 
    <option selected>Open this select menu</option>`;
    getAllPersona().then((array_pesonas) => {
        array_pesonas.map(({ id_persona, nombre }) => {
            html += `<option value="${id_persona}">${nombre}</option>`
        })
        html += ` </select> </div>`
        form_edicion.innerHTML = html;
        form_persona.classList.add("d-none");
        form_edicion.classList.remove("d-none")
    })

}

function habilitarForm() {
    switch (select_opcion.value) {
        case "USUARIO":
            cleanFromUsuario()
            toggleAviso("hidden");
            hiddenForms();
            boton_form_credencial_registrar.removeAttribute("onclick")
            boton_form_credencial_registrar.setAttribute("onclick", "registrarUsuario()")
            boton_form_credencial_registrar.innerHTML = "Registrar"
            form_persona.classList.remove("d-none");
            form_credencial.classList.remove("d-none")
            break;
        case "PROVEEDOR":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_proveedor.removeAttribute("onclick")
            boton_form_proveedor.setAttribute("onclick", "registrarProveedor()")
            boton_form_proveedor.innerHTML = "Registrar"
            form_persona.classList.remove("d-none");
            form_proveedor.classList.remove("d-none")
            break;
        case "TRANSPORTISTA":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_transportista.removeAttribute("onclick")
            boton_form_transportista.setAttribute("onclick", "registrarTransportista()")
            boton_form_transportista.innerHTML = "Registrar"
            form_persona.classList.remove("d-none");
            form_transportista.classList.remove("d-none")
            break;
        case "VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectTransportista();
            llenarSelectTipoVehiculo();
            boton_form_vehiculo.removeAttribute("onclick")
            boton_form_vehiculo.setAttribute("onclick", "registrarVehiculo()")
            boton_form_vehiculo.innerHTML = "Registrar"
            form_vehiculo.classList.remove("d-none");
            break;
        case "LINEA":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_linea.removeAttribute("onclick")
            boton_form_linea.setAttribute("onclick", "registrarLinea()")
            boton_form_linea.innerHTML = "Registrar"
            form_linea.classList.remove("d-none");
            break;
        case "PROCESO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            boton_form_proceso.removeAttribute("onclick")
            boton_form_proceso.setAttribute("onclick", "registrarProceso()")
            boton_form_proceso.innerHTML = "Registrar"
            form_proceso.classList.remove("d-none");
            break;
        case "MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            boton_form_material.removeAttribute("onclick")
            boton_form_material.setAttribute("onclick", "registrarMaterial()")
            boton_form_material.innerHTML = "Registrar"
            form_material.classList.remove("d-none");
            break;
        case "TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            boton_form_tipo_material.removeAttribute("onclick")
            boton_form_tipo_material.setAttribute("onclick", "registrarTipoMaterial()")
            boton_form_tipo_material.innerHTML = "Registrar"
            form_tipo_material.classList.remove("d-none");
            break;
        case "TIPO_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_tipo_vehiculo.removeAttribute("onclick")
            boton_form_tipo_vehiculo.setAttribute("onclick", "registrarTipoVehiculo()")
            boton_form_tipo_vehiculo.innerHTML = "Registrar"
            form_tipo_vehiculo.classList.remove("d-none");
            break;
        case "TIPO_CONTAMINACION":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_tipo_contaminacion.removeAttribute("onclick")
            boton_form_tipo_contaminacion.setAttribute("onclick", "registrarContaminacion()")
            boton_form_tipo_contaminacion.innerHTML = "Registrar"
            form_tipo_contaminacion.classList.remove("d-none");
            break;
        case "FORMA_RECEPCION":
            toggleAviso("hidden");
            hiddenForms();
            boton_form_forma_recepcion.removeAttribute("onclick")
            boton_form_forma_recepcion.setAttribute("onclick", "registrarFormaRecepcion()")
            boton_form_forma_recepcion.innerHTML = "Registrar"
            form_forma_recepcion.classList.remove("d-none")
            break;
        case "EDI_TICKET_PESO":
            toggleAviso("hidden");
            hiddenForms();
            htmlTicketPeso();
            llenarSelectLinea();
            llenarSelectMaterial();
            llenarSelectProceso();
            llenarSelectTipoMaterial();
            llenarSelectFormaRecepcion();
            llenarSelectTransportista();
            llenarSelectVehiculo();
            llenarSelectProveedor();
            llenarSelectTipoContaminacion();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_USUARIO":
            toggleAviso("hidden");
            hiddenForms();
            htmlUsuario();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_PROVEEDOR":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarProveedor()
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_TRANSPORTISTA":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarTransportista();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectTransportista()
            llenarSelectTipoVehiculo()
            htmlEditarVehiculo();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_LINEA":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarLinea();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_PROCESO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            htmlEditarProceso();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            htmlEditarMaterial();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            htmlEditarTipoMaterial();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_TIPO_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarTipoVehiculo();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_TIPO_CONTAMINACION":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarTipoContaminacion();
            form_edicion.classList.remove("d-none")
            break;
        case "EDI_FORMA_RECEPCION":
            toggleAviso("hidden");
            hiddenForms();
            htmlEditarFormaRecepcion();
            form_edicion.classList.remove("d-none")
            break;
        default:
            hiddenForms();
            toggleAviso("show");

    }
}