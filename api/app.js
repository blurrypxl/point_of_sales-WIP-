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
app.get('/api', function (req, res) {
  res.status(200).json('API Siap digunakan');
});
// ========================== ROOT ROUTE - STOP

app.use('/api/auth', auth);
app.use('/api/master', master);
app.use('/api/pengguna', pengguna);
app.use('/api/akun', akun);
app.use('/api/menu', menu);

// ========================== Error 404 Middleware - START
app.use(function (req, res, next) {
  const error = new Error('Not Found');

  error.status = 404;

  next(error);
});
// ========================== Error 404 Middleware - STOP

// ========================== Error's Middleware - START
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ 'status': err.status || 500, 'msg': err.message });
});
// ========================== Error's Middleware - STOP

app.listen(3000, function () {
  console.log('server running at port 3000');
});