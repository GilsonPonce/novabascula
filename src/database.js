const mysql = require('mysql');

const connection = mysql.createConnection('mysql://root:admin1223@localhost/bascula?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

function getConnection(){
    return connection;
}

module.exports = {getConnection}

