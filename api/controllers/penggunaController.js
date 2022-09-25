const Router = require('express').Router();
const GenerateId = require('generate-unique-id');
const Pengguna = require('../models/Pengguna');
const Auth = require('../models/Auth');

Router.get('/read',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Pengguna.findAll(function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.status(200).json({ 'status': 200, 'msg': data });
    });
  });

Router.get('/read/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Pengguna.findById({ 'id_pengguna': req.params.id },
      function (err, data) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': data });
      });
  });

Router.post('/create',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Pengguna.create({
      'id_pengguna': GenerateId({ length: 20 }),
      'nama_pengguna': req.body.nama_pengguna,
      'email_pengguna': req.body.email_pengguna,
      'alamat_pengguna': req.body.alamat_pengguna,
      'jabatan': req.body.jabatan,
      'ditambah_oleh': res.locals.user.nama_master
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data pengguna berhasil ditambah.' });
      });
  });

Router.put('/update/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    // Get data pengguna by id
    Pengguna.findById({ id_pengguna: req.params.id }, function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.locals.dataPengguna = data[0];
    });

    next();
  }),
  function (req, res) {
    const datapengguna = res.locals.dataPengguna;

    // Update data pengguna
    Pengguna.update({
      'nama_pengguna': req.body.nama_pengguna === '' ? datapengguna.nama_pengguna : req.body.nama_pengguna,
      'email_pengguna': req.body.email_pengguna === '' ? datapengguna.email_pengguna : req.body.email_pengguna,
      'alamat_pengguna': req.body.alamat_pengguna === '' ? datapengguna.alamat_pengguna : req.body.alamat_pengguna,
      'jabatan': req.body.jabatan === '' ? datapengguna.jabatan : req.body.jabatan,
      'diedit_oleh': res.locals.user.nama_master
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data pengguna berhasil diupdate.' });
      });
  };

Router.delete('/delete/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }
    
    Pengguna.remove({ 'id_pengguna': req.params.id },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data pelanggan berhasil dihapus.' });
      });
  });

module.exports = Router;