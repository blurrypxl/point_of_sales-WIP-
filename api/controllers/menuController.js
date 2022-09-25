const Router = require('express').Router();
const GenerateId = require('generate-unique-id');
const Menu = require('../models/Menu');
const Auth = require('../models/Auth');

Router.get('/read',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 500;

      return next(error);
    }

    Menu.findAll(function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.status(200).json(data);
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

    Menu.create({
      'id_menu': GenerateId({ length: 20 }),
      'id_master': res.locals.user.id_master,
      'nama_menu': req.body.nama_menu,
      'jenis_menu': req.body.jenis_menu,
      'qty_menu': req.body.qty_menu,
      'harga_menu': req.body.harga_menu,
      'ditambah_oleh': res.locals.user.nama_master
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil ditambah.' });
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

    // console.log(req.params.id);

    Menu.findById({ 'id_menu': req.params.id },
      function (err, data) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        // console.log(data[0]);

        res.locals.menu = data[0];

        next();
      });
  },
  function (req, res, next) {
    const dataMenu = res.locals.menu;

    // console.log(dataMenu);
    // console.log(req.body);

    Menu.update({
      'nama_user': res.locals.user.nama_pengguna,
      'nama_menu': req.body.nama_menu === '' ? dataMenu.nama_menu : req.body.nama_menu,
      'jenis_menu': req.body.jenis_menu === '' ? dataMenu.jenis_menu : req.body.jenis_menu,
      'qty_menu': req.body.qty_menu === '' ? dataMenu.qty_menu : req.body.qty_menu,
      'harga_menu': req.body.harga_menu === '' ? dataMenu.harga_menu : req.body.harga_menu,
      'diedit_oleh': res.locals.user.nama_master
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil diedit.' });
      });
  });

Router.delete('/delete/:id',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Menu.delete({ 'id_menu': req.params.id },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil dihapus.' });
      });
  }
);

module.exports = Router;