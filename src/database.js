const mysql = require('mysql');

const connection = mysql.createConnection('mysql://root:admin1223@localhost/bascula?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

function getConnection() {
    return connection;
}

const infoticket = (id) => {
    let queryticket = `
    select
    tic.id_ticket, tic.fecha_ticket, tic.fecha_procesado, veh.placa , pro.nombre as proveedor, tran.cedula ,tran.nombre as transportista
    from 
    (select prov.id_proveedor,concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona ) pro,
    (select trans.id_transportista, per.cedula,  concat(per.apellidos,' ',per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
    ticket tic, vehiculo veh
    where veh.id_vehiculo = tic.id_vehiculo and pro.id_proveedor = tic.id_proveedor and tran.id_transportista = veh.id_transportista and tic.procesado = 1 and tic.id_ticket =`  + connection.escape(id)
    return new Promise((resolve, reject) => {
        connection.query(queryticket, (err, result, fields) => {
            if (err) return reject(err)
            resolve(result[0]);
        });
    });
}

const infopesos = (id, objeto) => {
    let querypeso = `select pe.id_peso,
    pe.peso, pe.peso_contaminacion, pe.porcentaje_contaminacion, pe.peso_total, pe.tipo_peso, pe.forma_recepcion, pe.fecha_hora,
    li.nombre as linea, pro.nombre as proceso, ma.nombre as material, tma.nombre as tipomaterial
    from ticket tic left join peso pe on tic.id_ticket = pe.id_ticket 
    left join tipomaterial tma on tma.id_tipo_material = pe.id_tipo_material
    left join material ma on tma.id_material = ma.id_material 
    left join proceso pro on ma.id_proceso = pro.id_proceso
    left join linea li on pro.id_linea = li.id_linea 
    where tic.id_ticket = ` + connection.escape(id) + ` order by pe.id_peso asc`
    return new Promise((resolve, reject) => {
        connection.query(querypeso, (err, result, fields) => {
            if (err) return reject(err)
            resolve({
                infoticket: objeto,
                pesos: result
            });
        });
    });
}

const infocontaminacion = (id) => {
    let querycontaminacion = `select pe.id_peso, tpcon.nombre from tipocontaminacion tpcon, 
    contaminacion con, peso pe, ticket tic where tpcon.id_tipo_contaminacion = con.id_tipo_contaminacion 
    and  pe.id_peso = con.id_peso and tic.id_ticket = pe.id_ticket and tic.id_ticket = `+ connection.escape(id);
    return new Promise((resolve, reject) => {
            getConnection().query(querycontaminacion, (err2, rows2, fields) => {
                if (err2) reject(err)
                resolve(rows2)
            })
    });
}

const getTicketSinProcesar = () => {
    $query = `
    select
    tic.id_ticket, tic.fecha_ticket, veh.placa, pro.nombre as proveedor, tran.nombre as transportista
    from
    (select prov.id_proveedor, concat(per.apellidos, ' ', per.nombres) as nombre from persona per inner join proveedor prov on per.id_persona = prov.id_persona) pro,
    (select trans.id_transportista, concat(per.apellidos, ' ', per.nombres) as nombre from persona per inner join transportista trans on per.id_persona = trans.id_persona ) tran,
    ticket tic, vehiculo veh
    where veh.id_vehiculo = tic.id_vehiculo and pro.id_proveedor = tic.id_proveedor and tran.id_transportista = veh.id_transportista and tic.procesado = 0`

    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            if (rows.length == 0) reject("No hay ticket para procesar")
            resolve(rows)
        });
    })
}

module.exports = { getConnection, infocontaminacion, infopesos, infoticket, getTicketSinProcesar }

