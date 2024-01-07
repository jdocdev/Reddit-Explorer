const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reddit_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Error en la conexión a la base de datos', err)
    } else {
        console.log('Conexión exitosa a la base de datos')
    }
});

module.exports = connection;