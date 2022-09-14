const router = require('express').Router();
const Pengguna = require('../models/Pengguna');
const Auth = require('../models/Auth');
// const validateToken = require('./validateController');

const validateToken = function (request, response, next) {
  Auth.validateToken({ 'token': request.headers['x-access-token'] }, function (err, decoded) {
    if (err) return response.status(400).json({ 'status': 400, 'access': false, 'msg': err.message });

    if (decoded.payload.role !== 'super-admin') return response.status(401).json({ 'status': 401, 'access': false, 'msg': 'Access Denied!' });

    response.locals.master = decoded.payload;
  });

  next();
}

router.get('/',
  validateToken,
  function (response) {
    Pengguna.findAll(function (err, data) {
      if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

      response.status(200).json({ 'status': 200, 'msg': data });
    });
  });

router.get('/:id',
  validateToken,
  function (request, response) {
    Pengguna.findById({ 'id_pengguna': request.params.id }, function (err, data) {
      if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

      response.status(200).json({ 'status': 200, 'access': true, 'msg': data });
    });
  });

router.post('/create',
  validateToken,
  function (request, response) {
    const dataMaster = response.locals.master;

    Pengguna.create({
      'nama_pengguna': request.body.nama_pengguna,
      'email_pengguna': request.body.email_pengguna,
      'alamat_pengguna': request.body.alamat_pengguna,
      'jabatan': request.body.jabatan,
      'ditambah_oleh': dataMaster.nama_master
    },
      function (err) {
        if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

        response.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data pengguna berhasil ditambah.' });
      });
  });

router.put('update/:id',
  validateToken,
  function (request, response, next) {
    // Get data pengguna by id
    Pengguna.findById({ id_pengguna: request.params.id }, function (err, data) {
      if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

      response.locals.dataPengguna = data[0];
    });

    next();
  }),
  function (request, response) {
    // Update data pengguna
    const dataMaster = response.locals.dataMaster;
    const datapengguna = response.locals.dataPengguna;

    Pengguna.update({
      'nama_pengguna': request.body.nama_pengguna === '' ? datapengguna.nama_pengguna : request.body.nama_pengguna,
      'email_pengguna': request.body.email_pengguna === '' ? datapengguna.email_pengguna : request.body.email_pengguna,
      'alamat_pengguna': request.body.alamat_pengguna === '' ? datapengguna.alamat_pengguna : request.body.alamat_pengguna,
      'jabatan': request.body.jabatan === '' ? datapengguna.jabatan : request.body.jabatan,
      'diedit_oleh': dataMaster.nama_master
    },
      function (err) {
        if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

        response.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data pengguna berhasil diupdate.' });
      });
  };

router.delete('/delete-pengguna/:id',
  validateToken,
  function (request, response) {
    const pengguna = new Pengguna({ 'id_pengguna': request.params.id });

    pengguna.remove(function (err) {
      if (err) return response.status(500).json({ 'status': 500, 'msg': err.message });

      response.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data pelanggan berhasil dihapus.' });
    });
  });

module.exports = router;