const Router = require('express').Router();
const GenerateId = require('generate-unique-id');
const Master = require('../models/Master');
const Auth = require('../models/Auth');

Router.get('/read',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Master.findAll(function (err, data) {
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
      const error = new Error('Access Denied');

      error.status = 401;

      return next(error);
    }

    Master.findById({ 'id_master': req.params.id }, function (err, data) {
      if (err){
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
      const error = new Error('Access Denied');

      error.status = 401;

      return next(error);
    }

    const { nama_master, email_master, alamat_master, password, role } = req.body;

    Master.create({
      'id_master': GenerateId({ length: 20 }),
      'nama_master': nama_master,
      'email_master': email_master,
      'alamat_master': alamat_master,
      'password': password,
      'role': role
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;
    
          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data master berhasil ditambah.' });
      });
  });

Router.put('/update/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied');

      error.status = 401;

      return next(error);
    }

    // Get data master by id
    Master.findById({ 'id_master': req.params.id }, function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;
  
        return next(error);
      }

      res.locals.dataMaster = data[0];
    });

    next();
  },
  function (req, res, next) {
    // Update data master
    const dataMaster = res.locals.dataMaster;

    const { nama_master, email_master, alamat_master, password } = req.body;

    Master.update({
      'nama_master': nama_master === '' ? dataMaster.nama_master : nama_master,
      'email_master': email_master === '' ? dataMaster.email_master : email_master,
      'alamat_master': alamat_master === '' ? dataMaster.alamat_master : alamat_master,
      'password': password === '' ? dataMaster.password : password
    }, function (err) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;
  
        return next(error);
      }

      res.status(200).json({ 'status': 200, 'msg': 'Data master berhasil diupdate.' });
    });
  });

module.exports = Router;