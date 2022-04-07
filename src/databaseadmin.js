const mysql = require('mysql'); 

// localAddress
// host
const connection =  mysql.createPool({
    connectionLimit : 10,
    host:"localhost",
    user: "root",
    password: "admin1223",
    database: "bascula",
    port: 3306
})

const insertCredencial = ({id_persona,user,password_user,estado}) => {
    $query = `insert into credencial(id_persona,user,password_user,estado) values(${id_persona},'${user}','${password_user}',${estado})`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
}

const deleteCredencial = (id_credencial) => {
    $query = `delete from bascula.credencial where id_credencial `.connection.escape(id_credencial)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const getPersona = (id_persona) => {
    let query = `select  per.id_persona, per.cedula, per.nombres, per.apellidos, per.fecha_nacimiento, 
    per.sexo, per.estado_civil, per.ciudadania, per.instruccion, per.lugar_expedicion, per.fecha_expedicion,
    per.fecha_expiracion, per.activo, cre.id_credencial, cre.user, cre.password_user, cre.estado
    from persona per left join credencial cre on per.id_persona = cre.id_persona where per.id_persona = `+connection.escape(id_persona)
    return new Promise((resolve,reject)=>{
        connection.query(query, function (err, rows, fields) {
            if (err) reject(err.message)
            console.log(rows)
            resolve(rows[0])
        });
    })
}

const getAllPersona = () => {
    $query = `select  id_persona, concat(apellidos," ",nombres) as nombre from persona`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            resolve(rows)
        });
    })
}

const insertPersona = ({cedula,nombres,apellidos,fecha_nacimiento,sexo,estado_civil,ciudadania,instruccion,lugar_expedicion,fecha_expedicion,fecha_expiracion,activo}) => {
    $query = `insert into persona (cedula,nombres,apellidos,fecha_nacimiento,sexo,estado_civil,ciudadania,
        instruccion, lugar_expedicion, fecha_expedicion, fecha_expiracion, activo) values('${cedula}','${nombres}',
        '${apellidos}','${fecha_nacimiento}','${sexo}','${estado_civil}','${ciudadania}','${instruccion}','${lugar_expedicion}',
        '${fecha_expedicion}','${fecha_expiracion}','${activo}')`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.insertId)
        });
    })
}

const deletePersona = (id_persona) => {
    $query = `delete from bascula.persona where id_persona = `.connection.escape(id_persona)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const updatePersona = ({id_persona,cedula,nombres,apellidos,fecha_nacimiento,sexo,estado_civil,ciudadania,instruccion,lugar_expedicion,fecha_expedicion,fecha_expiracion,activo}) => {
    $query = `update bascula.persona set activo = `+ connection.escape(activo) + ` ,cedula = '` + connection.escape(cedula) + 
    `' ,nombres = '`+ connection.escape(nombres) + `', apellidos = '`+ connection.escape(apellidos) +
    `' , fecha_nacimiento = '`+ connection.escape(fecha_nacimiento) + `' ,sexo = '` + connection.escape(sexo) +
    `' , estado_civil = '`+ connection.escape(estado_civil) + `' , ciudadania = '` + connection.escape(ciudadania) +
    `' , instruccion = '`+ connection.escape(instruccion) + `' , lugar_expedicion = '`+ connection.escape(lugar_expedicion) +
    `' , fecha_expedicion = '`+ connection.escape(fecha_expedicion) + `' , fecha_expiracion = '` + connection.escape(fecha_expiracion) +
    `' where id_persona = ` + connection.escape(id_persona)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
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
            if (rows.length == 0) reject("No hay ticket")
            resolve(rows)
        });
    })
}

const getAllProveedor = () => {
    $query = `select  pro.id_proveedor, concat(per.appelidos," ",per.nombres) as nombre
    from persona per inner join proveedor pro on per.id_persona = pro.id_persona`
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, rows, fields) {
            if (err) reject(err.message)
            if (rows.length == 0) reject("No hay ticket")
            resolve(rows)
        });
    })
}

const deleteProveedor = (id_proveedor) => {
    $query = `delete from bascula.proveedor where id_proveedor = `.connection.escape(id_proveedor)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

const updateProveedor = ({id_proveedor,activo}) => {
    $query = `update bascula.proveedor set activo = `+ connection.escape(activo) +` where id_proveedor = ` + connection.escape(id_proveedor)
    return new Promise((resolve,reject)=>{
        connection.query($query, function (err, result) {
            if (err) reject(err.message)
            resolve(result.affectedRows)
        });
    })
}

module.exports = {
    insertCredencial,
    deleteCredencial,
    getPersona,
    getAllPersona,
    insertPersona,
    updatePersona,
    deletePersona,
 }