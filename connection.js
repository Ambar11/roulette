const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    // host : 'localhost',
    // user : 'root',
    // password : '',
    // database : 'bhajiwaala',
    host: '107.178.108.59',
    user: 'daxyin_beting',
    password: 'DX7@karan',
    database: 'daxyin_beting',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('connected to database');
    } else {
        console.log('database connection failed' + err);

    }
});

module.exports = mysqlConnection;