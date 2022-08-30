var express = require('express');
var path = require('path');
var logger = require('morgan');

const authController = require('./controllers/authController');
const pemilikController = require('./controllers/pemilikController');
const pegawaiController = require('./controllers/pegawaiController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', function (req, res) {
  res.send('API Siap digunakan');
});
app.use('/api/auth/', authController);
app.use('/api/pemilik/', pemilikController);
app.use('/api/pegawai/', pegawaiController);

app.listen(3000, function () {
  console.log('server running at port 3000');
});