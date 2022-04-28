const mysql = require('mysql'); 

// localAddress
// host
const connection =  mysql.createPool({
    connectionLimit : 10,
    host:"localhost",
    user: "appbascula",
    password: "admin1223",
    database: "bascula",
    port: 3306
})

const insertCredencial = (objeto) => {
    $query = `insert into credencial set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto,function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
}

const updateCredencial = (objeto) => {
    $query = `update bascula.credencial set user = ?, password_user = ?, 
    estado = ? where id_persona = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto) , function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getPersona = (id_persona) => {
    let query = `select  per.id_persona, per.cedula, per.nombres, per.apellidos, per.fecha_nacimiento, 
    per.sexo, per.estado_civil, per.ciudadania, per.instruccion, per.lugar_expedicion, per.fecha_expedicion,
    per.fecha_expiracion, per.activo, cre.id_credencial, cre.user, cre.password_user, cre.estado
    from persona per inner join credencial cre on per.id_persona = cre.id_persona where per.id_persona = `+connection.escape(id_persona)
    return new Promise((resolve,reject)=>{
        connection.query(query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows[0])
        });
    })
}

const getAllPersona = () => {
    $query = `select  per.id_persona, concat(per.apellidos," ",per.nombres) as nombre from persona per`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllUsuario = () => {
    $query = `select  per.id_persona, concat(per.apellidos," ",per.nombres) as nombre from persona per inner join credencial cre on per.id_persona = cre.id_persona`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const insertPersona = (objetousuario) => {
    $query = `insert into persona set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objetousuario, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
}

const deletePersona = (id_persona) => {
    $query = `delete from persona where id_persona = `+ connection.escape(id_persona)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const updatePersona = (objeto) => {
    $query = `update persona set activo = ?, cedula = ?, 
    nombres = ?, apellidos = ?, fecha_nacimiento = ?, sexo = ?
    , estado_civil = ? , ciudadania = ?, instruccion = ?, lugar_expedicion = ?, 
    fecha_expedicion = ?, fecha_expiracion = ? where id_persona = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto) , function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getTransportista = (id_transportista) => {
    $query = `select  per.id_persona, per.cedula, per.nombres, per.apellidos, per.fecha_nacimiento, 
    per.sexo, per.estado_civil, per.ciudadania, per.instruccion, per.lugar_expedicion, per.fecha_expedicion,
    per.fecha_expiracion, per.activo as activo_persona, tra.activo as activo_transportista, tra.id_transportista,
    tra.vencimiento_licencia
    from persona per inner join transportista tra on per.id_persona = tra.id_persona where tra.id_transportista = `+connection.escape(id_transportista)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllTransportista = () => {
    $query = `select  tra.id_transportista, concat(per.apellidos," ",per.nombres) as nombre
    from persona per inner join transportista tra on per.id_persona = tra.id_persona`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteTransportista = (id_transportista) => {
    $query = `delete from transportista where id_transportista = `+ connection.escape(id_transportista)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertTransportista = (objeto) => {
    let query = `insert into transportista set ?`
    return new Promise((resolve,reject)=>{
        connection.query(query,objeto,function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateTransportista = (objeto) => {
    $query = `update transportista set activo = ?, vencimiento_licencia = ? where id_transportista = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getProveedor = (id_proveedor) => {
    $query = `select  per.id_persona, per.cedula, per.nombres, per.apellidos, per.fecha_nacimiento, 
    per.sexo, per.estado_civil, per.ciudadania, per.instruccion, per.lugar_expedicion, per.fecha_expedicion,
    per.fecha_expiracion, per.activo as activo_persona, pro.activo as activo_proveedor, pro.id_proveedor
    from persona per inner join proveedor pro on per.id_persona = pro.id_persona where pro.id_proveedor = `+connection.escape(id_proveedor)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllProveedor = () => {
    $query = `select  pro.id_proveedor, concat(per.apellidos," ",per.nombres) as nombre
    from persona per inner join proveedor pro on per.id_persona = pro.id_persona`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteProveedor = (id_proveedor) => {
    $query = `delete from proveedor where id_proveedor = `+ connection.escape(id_proveedor)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertProveedor = (objetoproveedor) => {
    $query = `insert into proveedor set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objetoproveedor, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateProveedor = (objeto) => {
    $query = `update proveedor set activo = ? where id_proveedor = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getVehiculo = (id) => {
    $query = `select veh.id_vehiculo, veh.placa, veh.vencimiento_matricula, veh.activo, veh.id_transportista, veh.id_tipo_vehiculo,
    tveh.nombre
    from vehiculo veh inner join tipovehiculo tveh on tveh.id_tipo_vehiculo = veh.id_tipo_vehiculo where veh.id_vehiculo = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllVehiculo = () => {
    $query = `select id_vehiculo, placa, id_transportista from vehiculo`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteVehiculo = (id) => {
    $query = `delete from vehiculo where id_vehiculo = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertVehiculo = (objeto) => {
    $query = `insert into vehiculo set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateVehiculo = (objeto) => {
    $query = `update vehiculo set placa = ?, vencimiento_matricula = ?, activo = ?, id_transportista = ?, 
    id_tipo_vehiculo = ? where id_vehiculo = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getTipoVehiculo = (id) => {
    $query = `select id_tipo_vehiculo, nombre
    from tipovehiculo where id_tipo_vehiculo = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllTipoVehiculo = () => {
    $query = `select id_tipo_vehiculo, nombre from tipovehiculo`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteTipoVehiculo = (id) => {
    $query = `delete from tipovehiculo where id_tipo_vehiculo = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertTipoVehiculo = (objeto) => {
    $query = `insert into tipovehiculo set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateTipoVehiculo = (objeto) => {
    $query = `update tipovehiculo set nombre = ? where id_tipo_vehiculo = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getLinea = (id) => {
    $query = `select id_linea, nombre from linea where id_linea = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllLinea = () => {
    $query = `select id_linea, nombre from linea`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteLinea = (id) => {
    $query = `delete from linea where id_linea = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertLinea = (objeto) => {
    $query = `insert into linea set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateLinea = (objeto) => {
    $query = `update linea set nombre = ? where id_linea = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getProceso = (id) => {
    $query = `select id_proceso, id_linea, nombre from proceso where id_proceso = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllProceso = () => {
    $query = `select id_proceso, id_linea, nombre from proceso`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteProceso = (id) => {
    $query = `delete from proceso where id_proceso = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertProceso = (objeto) => {
    $query = `insert into proceso set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateProceso = (objeto) => {
    $query = `update proceso set nombre = ?, id_linea = ? where id_proceso = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getMaterial = (id) => {
    $query = `select id_material, id_proceso, nombre from material where id_material = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllMaterial = () => {
    $query = `select id_material, id_proceso, nombre from material`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteMaterial = (id) => {
    $query = `delete from material where id_material = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertMaterial = (objeto) => {
    $query = `insert into material set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateMaterial = (objeto) => {
    $query = `update material set nombre = ?, id_proceso = ? where id_material = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getTipoMaterial = (id) => {
    $query = `select id_tipo_material, id_material, nombre from tipomaterial where id_tipo_material = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllTipoMaterial = () => {
    $query = `select id_tipo_material, id_material, nombre from tipomaterial`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteTipoMaterial = (id) => {
    $query = `delete from tipomaterial where id_tipo_material = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertTipoMaterial = (objeto) => {
    $query = `insert into tipomaterial set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateTipoMaterial = (objeto) => {
    $query = `update tipomaterial set nombre = ?, id_material = ? where id_tipo_material = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getTicket = (id) => {
    $query = `select id_ticket, fecha_ticket, observaciones, procesado, fecha_procesado, id_vehiculo, id_proveedor, id_empresa 
    from ticket where id_ticket = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllTicket = () => {
    $query = `select id_ticket, procesado from ticket`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteTicket = (id) => {
    $query = `delete from ticket where id_ticket = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertTicket = (objeto) => {
    $query = `insert into ticket set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateTicket = (objeto) => {
    $query = `update ticket set fecha_ticket = ?, observaciones = ?, procesado = ?, fecha_procesado = ?, 
    id_vehiculo = ?, id_proveedor = ?, id_empresa = ? where id_ticket = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getPeso = (id) => {
    $query = `select pe.id_peso, pe.tipo_peso, pe.forma_recepcion, pe.peso, pe.peso_contaminacion, pe.porcentaje_contaminacion,
    pe.peso_total, pe.fecha_hora, pe.id_ticket, pe.id_tipo_material, ma.id_material, pro.id_proceso,  li.id_linea
    from peso pe inner join tipomaterial tpm on tpm.id_tipo_material = pe.id_tipo_material
    inner join material ma on ma.id_material = tpm.id_tipo_material
    inner join proceso pro on pro.id_proceso = ma.id_proceso
    inner join linea li on li.id_linea = pro.id_linea where id_peso = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllPeso = () => {
    $query = `select id_peso, tipo_peso, forma_recepcion, peso, peso_contaminacion, porcentaje_contaminacion,
    peso_total, fecha_hora, id_ticket, id_tipo_material 
    from peso`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deletePeso = (id) => {
    $query = `delete from peso where id_peso = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertPeso = (objeto) => {
    $query = `insert into peso set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updatePeso = (objeto) => {
    $query = `update peso set tipo_peso = ?, forma_recepcion = ?, peso = ?, peso_contaminacion = ?, 
    porcentaje_contaminacion = ?, peso_total = ?, fecha_hora = ?, id_ticket = ?, id_tipo_material = ? where id_peso = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getContaminacion = (id) => {
    $query = `select id_contaminacion, id_tipo_contaminacion, id_peso from contaminacion where id_contaminacion = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllContaminacion = () => {
    $query = `select con.id_contaminacion, con.id_tipo_contaminacion, con.id_peso, tcon.nombre from contaminacion con inner join tipocontaminacion tcon on tcon.id_tipo_contaminacion = con.id_tipo_contaminacion`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteContaminacion = (id) => {
    $query = `delete from contaminacion where id_contaminacion = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertContaminacion = (objeto) => {
    $query = `insert into contaminacion set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateContaminacion = (objeto) => {
    $query = `update contaminacion set id_tipo_contaminacion = ?, id_peso = ? where id_contaminacion = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getTipoContaminacion = (id) => {
    $query = `select id_tipo_contaminacion, nombre from tipocontaminacion where id_tipo_contaminacion = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllTipoContaminacion = () => {
    $query = `select id_tipo_contaminacion, nombre from tipocontaminacion`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteTipoContaminacion = (id) => {
    $query = `delete from tipocontaminacion where id_tipo_contaminacion = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertTipoContaminacion = (objeto) => {
    $query = `insert into tipocontaminacion set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateTipoContaminacion = (objeto) => {
    $query = `update tipocontaminacion set nombre = ? where id_tipo_contaminacion = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getFormaRecepcion = (id) => {
    $query = `select id_forma_recepcion, nombre from formarecepcion where id_forma_recepcion = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllFormaRecepcion = () => {
    $query = `select id_forma_recepcion, nombre from formarecepcion`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteFormaRecepcion = (id) => {
    $query = `delete from formarecepcion where id_forma_recepcion = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertFormaRecepcion = (objeto) => {
    $query = `insert into formarecepcion set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateFormaRecepcion = (objeto) => {
    $query = `update formarecepcion set nombre = ? where id_forma_recepcion = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}


const getEmpresa = (id) => {
    $query = `select razon_social, ruc, representante_legal, actividad_principal, url_logo from empresa where id_empresa = `+connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const getAllEmpresa = () => {
    $query = `select razon_social, ruc, representante_legal, actividad_principal, url_logo from empresa`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const deleteEmpresa = (id) => {
    $query = `delete from empresa where id_empresa = ` + connection.escape(id)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const insertEmpresa = (objeto) => {
    $query = `insert into empresa set ?`
    return new Promise((resolve,reject)=>{
        connection.query($query,objeto, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
} 

const updateEmpresa = (objeto) => {
    $query = `update empresa set razon_social = ?, ruc = ?, representante_legal = ?, actividad_principal = ?, url_logo = ?
     where id_empresa = ?`
    return new Promise((resolve,reject)=>{
        connection.query($query, Object.values(objeto),function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

module.exports = {
    insertCredencial,
    updateCredencial,
    getPersona,
    getAllPersona,
    insertPersona,
    updatePersona,
    deletePersona,
    getProveedor,
    getAllProveedor,
    insertProveedor,
    updateProveedor,
    deleteProveedor,
    getTransportista,
    getAllTransportista,
    insertTransportista,
    updateTransportista,
    deleteTransportista,
    getVehiculo,
    getAllVehiculo,
    insertVehiculo,
    updateVehiculo,
    deleteVehiculo,
    getTipoVehiculo,
    getAllTipoVehiculo,
    insertTipoVehiculo,
    updateTipoVehiculo,
    deleteTipoVehiculo,
    getLinea,
    getAllLinea,
    insertLinea,
    updateLinea,
    deleteLinea,
    getProceso,
    getAllProceso,
    insertProceso,
    updateProceso,
    deleteProceso,
    getMaterial,
    getAllMaterial,
    insertMaterial,
    updateMaterial,
    deleteMaterial,
    getTipoMaterial,
    getAllTipoMaterial,
    insertTipoMaterial,
    updateTipoMaterial,
    deleteTipoMaterial,
    getTicket,
    getAllTicket,
    insertTicket,
    updateTicket,
    deleteTicket,
    getPeso,
    getAllPeso,
    insertPeso,
    updatePeso,
    deletePeso,
    getTipoContaminacion,
    getAllTipoContaminacion,
    insertTipoContaminacion,
    updateTipoContaminacion,
    deleteTipoContaminacion,
    getContaminacion,
    getAllContaminacion,
    insertContaminacion,
    updateContaminacion,
    deleteContaminacion,
    getEmpresa,
    getAllEmpresa,
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    getFormaRecepcion,
    getAllFormaRecepcion,
    insertFormaRecepcion,
    updateFormaRecepcion,
    deleteFormaRecepcion,
    getAllUsuario
 }