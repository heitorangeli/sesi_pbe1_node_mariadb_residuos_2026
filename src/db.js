const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'gestao_residuos'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL')
    }
    console.log('Conectado com sucesso');
});

module.exports = connection;