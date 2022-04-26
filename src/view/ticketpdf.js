const { ipcRenderer } = require('electron');
const { infoticket, infopesos,  infocontaminacion } = require('../database');

const boton_imprimir = document.getElementById("boton_imprimir")
const id_ticket = document.getElementById("id_ticket")
const fecha_procesado = document.getElementById("fecha_procesado")
const tipo_tiket = document.getElementById("tipo_tiket")
const num_placa = document.getElementById("num_placa")
const nom_transportista = document.getElementById("nom_transportista")
const cedula_transportista = document.getElementById("cedula_transportista")
const observacion = document.getElementById("observacion")
const nom_proveedor = document.getElementById("nom_proveedor")
const body_table = document.getElementById("body_table")
const container = document.getElementById("container")

boton_imprimir.addEventListener('click',impresion)

function impresion(){
    ipcRenderer.send("imprimir")
}

ipcRenderer.on('pasoId',(event, id) => {
    cargarData(id)
});

function cargarData(id){
    let conteoSalida = 0;
    let salidaconta = [];
    let contaminacion = [];
    let htmlconta = "";
    infoticket(id)
    .then((info_ticket) => {
        return infopesos(id, info_ticket)
    }).then(({ infoticket, pesos }) => {
        console.error('INFORMACION',infoticket)
        let tipo_ticket = ""
        pesos.map((item) => {
            if (item.tipo_peso == "SALIDA") {
                tipo_ticket = item.linea + " - " + item.material;
                return;
            }
        });

        tipo_tiket.innerHTML = tipo_ticket
        id_ticket.innerHTML = infoticket.id_ticket
        fecha_procesado.innerHTML = infoticket.fecha_procesado == null ? "NO PROCESADO" : infoticket.fecha_procesado.getDate() + "/" + infoticket.fecha_procesado.getMonth() + "/" + infoticket.fecha_procesado.getFullYear() + " - " + infoticket.fecha_procesado.getHours() + ":" + infoticket.fecha_procesado.getMinutes() + ":" + infoticket.fecha_procesado.getSeconds()
        num_placa.innerHTML = infoticket.placa
        nom_transportista.innerHTML = infoticket.transportista
        cedula_transportista.innerHTML = infoticket.cedula
        observacion.innerHTML = infoticket.observaciones == null ? "" : infoticket.observaciones
        nom_proveedor.innerHTML = infoticket.proveedor
            
        pesos.map(({ id_peso, peso, peso_contaminacion, porcentaje_contaminacion, peso_total, tipo_peso, forma_recepcion, fecha_hora, proceso, material, tipomaterial }) => {
            tipo_peso == "SALIDA" && conteoSalida++;
            if (peso_contaminacion != null && peso_contaminacion != 0) {
                salidaconta.push(parseInt(conteoSalida))
                contaminacion.push(parseInt(id_peso))
            }
            body_table.innerHTML += `<tr>
                    <th class="th">${tipo_peso == "SALIDA" ? "SALIDA " + conteoSalida : tipo_peso}</th>
                    <td class="td">${proceso == null ? "" : proceso + " " + material == null ? "" : material + " " + tipomaterial == null ? "" : tipomaterial}</td>
                    <td class="td">${peso == null ? 0 : peso}</td>
                    <td class="td">${peso_contaminacion == null ? 0 : peso_contaminacion}</td>
                    <td class="td">${porcentaje_contaminacion == null ? 0 : porcentaje_contaminacion}</td>
                    <td class="td">${peso_total == null ? 0 : peso_total}</td>
                    <td class="td">${fecha_hora.getDate() + "/" + fecha_hora.getMonth() + "/" + fecha_hora.getFullYear() + " - " + fecha_hora.getHours() + ":" + fecha_hora.getMinutes() + ":" + fecha_hora.getSeconds()}</td>
                    <td class="td">${forma_recepcion}</td>
                    </tr>`

        })
    
        return infocontaminacion(id);
    }).then((NombreContaminacion) => {
        if (contaminacion.length > 0) {
           htmlconta += `<table class="table_data">`
            for (i in contaminacion) {
                let conta = NombreContaminacion.filter(({ id_peso }) => { return id_peso == contaminacion[i] })
                if (conta.length > 0) {
                    let detalle = ""
                    conta.map(({ nombre }) => {
                        detalle += `${nombre}, `
                    })
                    htmlconta += `<tr>
                <th class="th"> DETALLE DE CONTAMINACION SALIDA ${salidaconta[i]}</th>
                <td class="td">${detalle}</td>
                </tr>`
                }
            }
            htmlconta += `  </table>`
        }
        container.innerHTML += htmlconta
    });
}
