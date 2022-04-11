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
    getAllTicket} = require('../databaseadmin');

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
const input_form_usuario_ciudadania = document.getElementById("input_form_usuario_ciudadania")
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
const boton_form_credencial_registrar = document.getElementById("boton_form_credencial_registrar")
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
}

function htmlUsuario() {
    let html = `<div class="col-10"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Usuario</label><div class="col-9 mb-2">
    <select class="form-select" onchange="formEdicionUsuario()" aria-label="Default select example" id="select_edicion_usuario">
    <option selected>Open this select menu</option>`
    getAllPersona()
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

function deleteUsuario() {
    let id = document.getElementById("select_edicion_usuario").value
    if (!isNaN(parseInt(id))) {
        deletePersona(id).then((filas_afectadas) => {
            if (filas_afectadas > 0) {
                htmlUsuario();
                ipcRenderer.send('showAlert', "success", "Eliminacion exitosa")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        });
    }
}

function registrarUsuario() {
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
            ipcRenderer.send('showAlert', "error", msm)
        }).then((id) => {
            if (id > 0) {
                cleanFromUsuario();
                hiddenForms();
                location.reload();
                ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
    }
}

function registrarProveedor() {
    if (
        input_form_usuario_cedula.value != "" &&
        input_form_usuario_nombres.value != "" &&
        input_form_usuario_apellidos.value != "" &&
        !isNaN(parseInt(select_form_usuario_activo.value)) &&
        !isNaN(parseInt(select_form_proveedor_activo.value))
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
            return insertProveedor({
                id_persona: id_usuario,
                activo: parseInt(select_form_proveedor_activo.value)
            })
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        }).then((id) => {
            if (id > 0) {
                cleanFromUsuario();
                hiddenForms();
                location.reload();
                ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
    }
}

function registrarTransportista() {
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
            return insertProveedor({
                vencimiento_licencia: input_form_transportista_fecha_vencimiento.value == "" ? null : input_form_transportista_fecha_vencimiento.value,
                activo: parseInt(select_form_transportista_activo.value),
                id_persona: id_usuario
            })
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        }).then((id) => {
            if (id > 0) {
                cleanFromUsuario();
                hiddenForms();
                location.reload();
                ipcRenderer.send('showAlert', "success", "Ingreso exitoso")
            }
        }).catch((msm) => {
            ipcRenderer.send('showAlert', "error", msm)
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos por llenar!")
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
            ipcRenderer.send('showAlert', "error", msm)
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
                ipcRenderer.send('showAlert', "error", msm)
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
                ipcRenderer.send('showAlert', "error", msm)
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
                ipcRenderer.send('showAlert', "error", msm)
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
            ipcRenderer.send('showAlert', "error", msm)
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Campeon")
    }
}

function registrarMaterial(){
    if(
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
            ipcRenderer.send('showAlert', "error", msm)
        });
    } else {
        ipcRenderer.send('showAlert', "warning", "Faltan campos que llenar! Tilin")
    }
}

function registrarTipoMaterial(){
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
            ipcRenderer.send('showAlert', "error", msm)
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
            ipcRenderer.send('showAlert', "error", msm)
        })
    } else {
        ipcRenderer.send('showAlert', "warning", "Falta algun campo necesario")
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
    boton_form_credencial_registrar.removeAttribute('onclick')
    boton_form_credencial_registrar.setAttribute('onclick', 'insertUsuario()')
    boton_form_credencial_registrar.innerHTML = "Registrar"
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
                input_form_usuario_fecha_nacimiento.value = fecha_nacimiento == null ? "" : fecha_nacimiento.getFullYear() + "-" + fecha_nacimiento.getMonth() + "-" + fecha_nacimiento.getDate()
                select_form_usuario_sexo.value = sexo == null ? "" : sexo
                select_form_usuario_estado_civil.value = estado_civil == null ? "" : estado_civil
                input_form_usuario_ciudadania.value = ciudadania == null ? "" : ciudadania
                input_form_usuario_instruccion.value = instruccion == null ? "" : instruccion
                input_form_usuario_lugar_expedicion.value = lugar_expedicion == null ? "" : lugar_expedicion
                input_form_usuario_fecha_expedicion.value = fecha_expedicion == null ? "" : fecha_expedicion.getFullYear() + "-" + fecha_expedicion.getMonth() + "-" + fecha_expedicion.getDate()
                input_form_usuario_fecha_expiracion.value = fecha_expiracion == null ? "" : fecha_expiracion.getFullYear() + "-" + fecha_expiracion.getMonth() + "-" + fecha_expiracion.getDate()
                input_form_credencial_contrasena.value = password_user == null ? "" : password_user
                input_form_credencial_usuario.value = user == null ? "" : user
                select_form_usuario_activo.value = activo == null ? "" : activo
                form_persona.classList.remove("d-none")
                form_credencial.classList.remove("d-none")
                boton_form_credencial_registrar.innerHTML = "Actualizar"
            })
    }
}

function llenarSelectLinea(){
    let html = "<option selected>Open this select menu</option>";
    getAllLinea().then((array_lineas)=>{
        array_lineas.map(({id_linea,nombre})=>{
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
               
                break;
            case "EDI_LINEA":

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

function llenarSelectProceso(){
    let html = "<option selected>Open this select menu</option>";
    getAllProceso().then((array_procesos)=>{
        switch (select_opcion.value) {
            case "MATERIAL":
                array_procesos.map(({id_proceso,id_linea,nombre})=>{
                    if(id_linea == select_form_material_linea.value)  html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_material_proceso.innerHTML = html;
                break;
            case "TIPO_MATERIAL":
                array_procesos.map(({id_proceso,id_linea,nombre})=>{
                    if(id_linea == select_form_tipo_material_linea.value)  html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_tipo_material_proceso.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
               
                break;
            case "EDI_LINEA":

                break;
            case "EDI_PROCESO":
                select_form_proceso_linea.innerHTML = html;
                break;
            case "EDI_MATERIAL":
                array_procesos.map(({id_proceso,id_linea,nombre})=>{
                    if(id_linea == select_form_material_linea.value)  html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_material_linea.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                array_procesos.map(({id_proceso,id_linea,nombre})=>{
                    if(id_linea == select_form_tipo_material_linea.value)  html += `<option value="${id_proceso}">${nombre}</option>`
                })
                select_form_tipo_material_linea.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectMaterial(){
    let html = "<option selected>Open this select menu</option>";
    getAllMaterial().then((array_material)=>{
        switch (select_opcion.value) {
            case "MATERIAL":
                array_material.map(({id_proceso,id_material,nombre})=>{
                    if(id_proceso == select_form_material_proceso.value)  html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_material_material.innerHTML = html;
                break;
            case "TIPO_MATERIAL":
                array_material.map(({id_proceso,id_material,nombre})=>{
                    if(id_proceso == select_form_tipo_material_proceso.value)  html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_tipo_material_material.innerHTML = html;
                break;
            case "EDI_TICKET_PESO":
               
                break;
            case "EDI_MATERIAL":
                array_material.map(({id_proceso,id_material,nombre})=>{
                    if(id_proceso == select_form_material_proceso.value)  html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_material_material.innerHTML = html;
                break;
            case "EDI_TIPO_MATERIAL":
                array_material.map(({id_proceso,id_material,nombre})=>{
                    if(id_proceso == select_form_tipo_material_proceso.value)  html += `<option value="${id_material}">${nombre}</option>`
                })
                select_form_tipo_material_material.innerHTML = html;
                break;
            default:
                break;
        }
    })
}

function llenarSelectTransportista(){
    let html = "<option selected>Open this select menu</option>";
    getAllTransportista().then((array_transportista)=>{
        array_transportista.map(({id_transportista,nombre})=>{
            html += `<option value="${id_transportista}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "VEHICULO":
                select_form_vehiculo_transportista.innerHTML = html;
                break;
            case "EDI_VEHICULO":
    
                break;
            default:
                break;
        }
    })
}

function llenarSelectTipoVehiculo(){
    let html = "<option selected>Open this select menu</option>";
    getAllTipoVehiculo().then((array_tipoVehiculo)=>{
        array_tipoVehiculo.map(({id_tipo_vehiculo,nombre})=>{
            html += `<option value="${id_tipo_vehiculo}">${nombre}</option>`
        })
        switch (select_opcion.value) {
            case "VEHICULO":
                select_form_vehiculo_tipo_vehiculo.innerHTML = html;
                break;
            case "EDI_VEHICULO":
    
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
    <select class="form-select" aria-label="Default select example" id="select_edicion_numero_ticket" disabled>
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
    getAllTicket().then((array_tickets)=>{
        array_tickets.map(({procesado,id_ticket})=>{
            if( Number(procesadose) == procesado ) html += `<option value="${id_ticket}">${id_ticket}</option>`
        });
        document.getElementById("select_edicion_numero_ticket").innerHTML = html;
        document.getElementById("select_edicion_numero_ticket").removeAttribute("disabled")
    })
    
}



function habilitarForm() {
    switch (select_opcion.value) {
        case "USUARIO":
            cleanFromUsuario()
            toggleAviso("hidden");
            hiddenForms();
            form_persona.classList.remove("d-none");
            form_credencial.classList.remove("d-none")
            break;
        case "PROVEEDOR":
            toggleAviso("hidden");
            hiddenForms();
            form_persona.classList.remove("d-none");
            form_proveedor.classList.remove("d-none")
            break;
        case "TRANSPORTISTA":
            toggleAviso("hidden");
            hiddenForms();
            form_persona.classList.remove("d-none");
            form_transportista.classList.remove("d-none")
            break;
        case "VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectTransportista();
            llenarSelectTipoVehiculo();
            form_vehiculo.classList.remove("d-none");
            break;
        case "LINEA":
            toggleAviso("hidden");
            hiddenForms();
            form_linea.classList.remove("d-none");
            break;
        case "PROCESO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            form_proceso.classList.remove("d-none");
            break;
        case "MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            form_material.classList.remove("d-none");
            break;
        case "TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            form_tipo_material.classList.remove("d-none");
            break;
        case "TIPO_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            form_tipo_vehiculo.classList.remove("d-none");
            break;
        case "TIPO_CONTAMINACION":
            toggleAviso("hidden");
            hiddenForms();
            form_tipo_contaminacion.classList.remove("d-none");
            break;
        case "EDI_TICKET_PESO":
            toggleAviso("hidden");
            hiddenForms();
            htmlTicketPeso();
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
            break;
        case "EDI_TRANSPORTISTA":
            toggleAviso("hidden");
            hiddenForms();
            break;
        case "EDI_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            break;
        case "EDI_LINEA":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            break;
        case "EDI_PROCESO":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            break;
        case "EDI_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            break;
        case "EDI_TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            llenarSelectLinea();
            break;
        case "EDI_TIPO_VEHICULO":
            toggleAviso("hidden");
            hiddenForms();
            break;
        case "EDI_TIPO_CONTAMINACION":
            toggleAviso("hidden");
            hiddenForms();
            break;
        default:
            hiddenForms();
            toggleAviso("show");

    }
}