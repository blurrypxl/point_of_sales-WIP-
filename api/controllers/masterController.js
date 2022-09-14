const router = require('express').Router();
const Master = require('../models/Master');
const Auth = require('../models/Auth');
// const validateToken = require('./validateController');

const validateToken = function (req, res, next) {
  Auth.validateToken({ 'token': req.headers['x-access-token'] }, function (err, decoded) {
    if (err) return res.status(400).json({ 'status': 400, 'msg': 'Token Expired/Token Not Provided.', 'fullmsg': err });

    if (decoded.payload.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'access': false, 'msg': 'Access Denied!' });
  });

  next();
}

router.get('/read-master',
  validateToken,
  function (req, res) {
    Master.findAll(function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': data });
    });
  });

router.get('/read-master/:id',
  validateToken,
  function (req, res) {
    Master.findById({ 'id_master': req.params.id }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': data });
    });
  });

router.post('/create-master',
  validateToken,
  function (req, res) {
    const { nama_master, email_master, alamat_master, password, role } = req.body;

    Master.create({
      'nama_master': nama_master,
      'email_master': email_master,
      'alamat_master': alamat_master,
      'password': password,
      'role': role
    }, function (err) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data master berhasil ditambah.' });
    });
  });

router.put('/update-master/:id',
  validateToken,
  function (req, res, next) {
    // Get data master by id
    Master.findById({ 'id_master': req.params.id }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      res.locals.dataMaster = data[0];

      next();
    });
  },
  function (req, res) {
    // Update data master
    const dataMaster = res.locals.dataMaster;

    const { nama_master, email_master, alamat_master, password } = req.body;

    Master.update({
      'nama_master': nama_master === '' ? dataMaster.nama_master : nama_master,
      'email_master': email_master === '' ? dataMaster.email_master : email_master,
      'alamat_master': alamat_master === '' ? dataMaster.alamat_master : alamat_master,
      'password': password === '' ? dataMaster.password : password
    }, function (err) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data master berhasil diupdate.' });
    });
  });

module.exports = router;