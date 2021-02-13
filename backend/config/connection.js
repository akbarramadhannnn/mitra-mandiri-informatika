const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123pitik',
  database: 'mitra-mandiri-informatika',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('connected');
});

module.exports = connection;
