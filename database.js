const db = require('mysql');

const mysql = db.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bebek_kopi_db'
});

module.exports = mysql;