const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'gjponceg',
    password:'',
    database:'novared'
})

function getConnection(){
    return connection;
}

module.exports = {
  getConnection
}

