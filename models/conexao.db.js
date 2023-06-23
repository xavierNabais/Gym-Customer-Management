const mysql = require("mysql2");
const dbConfig = require('../config/db.config.js');

//criar conexão db
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    socketPath: dbConfig.socketPath,
});

//executar ligação ao server
connection.connect(error => {
    if (error) throw error;
    console.log('Conexão com a base de dados estabelecida.');
});

module.exports = connection;