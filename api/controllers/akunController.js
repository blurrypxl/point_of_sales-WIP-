const Router = require('express').Router();
const GenerateId = require('generate-unique-id');
const Akun = require('../models/Akun');
const Auth = require('../models/Auth');

Router.get('/read',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Akun.findAll(function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.status(200).json({ 'status': 200, 'access': true, 'msg': data });
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

    Akun.findById({ 'id_akun': req.params.id }, function (err, data) {
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

    Akun.create({
      'id_akun': GenerateId({ length: 20 }),
      'id_pengguna': req.body.id_pengguna,
      'password': req.body.password,
      'role': req.body.role,
      'ditambah_oleh': res.locals.user.nama_master
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;
    
          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data akun berhasil ditambahkan.' });
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

    Akun.update({ 'password': req.body.password },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;
    
          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data akun berhasil diupdate.' });
      });
  });

Router.delete('/delete/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Akun.delete({ 'id_akun': req.params.id },
      function (err) {
        if (err) {
          const error = new Error('Access Denied!');

          error.status = 401;
    
          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data akun berhasil dihapus.' });
      });
  });

module.exports = Router;