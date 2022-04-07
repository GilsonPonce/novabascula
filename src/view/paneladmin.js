const { getPersona, getAllPersona, insertPersona } = require('../databaseadmin');

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
const input_form_usuario_ciudadania = document.getElementById("input_form_usuario_ciudadania")
const input_form_usuario_instruccion = document.getElementById("input_form_usuario_instruccion")
const input_form_usuario_fecha_expedicion = document.getElementById("input_form_usuario_fecha_expedicion")
const input_form_usuario_fecha_expiracion = document.getElementById("input_form_usuario_fecha_expiracion")
const input_form_usuario_lugar_expedicion = document.getElementById("input_form_usuario_lugar_expedicion")
const input_form_credencial_usuario = document.getElementById("input_form_credencial_usuario")
const input_form_credencial_contrasena = document.getElementById("input_form_credencial_contrasena")
const boton_form_credencial_registrar = document.getElementById("boton_form_credencial_registrar")
const aviso = document.getElementById("aviso")

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
    let html = `<div class="col"><label for="inputEmail4" class="form-label col-sm-3 mb-2">Usuario</label><div class="col-9 mb-2">
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
            }
        })
        form_credencial.innerHTML += `<div class="col-2">
            <button class="btn btn-danger" id="boton_form_credencial_delete">Eliminar</button>
        </div>`

}

function cleanFromUsuario(){
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
    let id = document.getElementById("select_edicion_usuario").value
    getPersona(id)
        .then(({cedula, nombres, apellidos, fecha_nacimiento, sexo, estado_civil, ciudadania, instruccion, lugar_expedicion, fecha_expedicion, fecha_expiracion, password_user, user }) => {
            input_form_usuario_cedula.value = cedula == null ? "" : cedula
            input_form_usuario_apellidos.value = apellidos == null ? "" : apellidos
            input_form_usuario_nombres.value = nombres == null ? "" : nombres
            input_form_usuario_fecha_nacimiento.value = fecha_nacimiento == null ? "" : fecha_nacimiento
            select_form_usuario_sexo.value = sexo == null ? "" : sexo
            select_form_usuario_estado_civil.value = estado_civil == null ? "" : estado_civil
            input_form_usuario_ciudadania.value = ciudadania == null ? "" : ciudadania
            input_form_usuario_instruccion.value = instruccion == null ? "" : instruccion
            input_form_usuario_lugar_expedicion.value = lugar_expedicion == null ? "" : lugar_expedicion
            input_form_usuario_fecha_expedicion.value = fecha_expedicion == null ? "" : fecha_expedicion
            input_form_usuario_fecha_expiracion.value = fecha_expiracion == null ? "" : fecha_expiracion
            input_form_credencial_contrasena.value = password_user == null ? "" : password_user
            input_form_credencial_usuario.value = user == null ? "" : user
            form_persona.classList.remove("d-none")
            form_credencial.classList.remove("d-none")
            form_edicion.classList.remove("d-none")
            boton_form_credencial_registrar.innerHTML = "Actualizar"
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
    //select_edicion_numero_ticket

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
            form_proceso.classList.remove("d-none");
            break;
        case "MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            form_material.classList.remove("d-none");
            break;
        case "TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
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
            break;
        case "EDI_PROCESO":
            toggleAviso("hidden");
            hiddenForms();
            break;
        case "EDI_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
            break;
        case "EDI_TIPO_MATERIAL":
            toggleAviso("hidden");
            hiddenForms();
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