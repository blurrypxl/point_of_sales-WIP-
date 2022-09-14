const express = require('express');
const path = require('path');
const logger = require('morgan');

const auth = require('./controllers/authController');
const master = require('./controllers/masterController');
const pengguna = require('./controllers/penggunaController');
const akun = require('./controllers/akunController');
const menu = require('./controllers/menuController');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ========================== ROOT ROUTE - START
app.get('/', function (req, res) {
  res.status(200).json('Aplikasi Siap digunakan');
});
// ========================== ROOT ROUTE - START

app.use('/api/auth', auth);
app.use('/api/master', master);
app.use('/api/penggguna', pengguna);
app.use('/api/akun', akun);
app.use('/api/menu', menu);

app.listen(3000, function () {
  console.log('server running at port 3000');
});