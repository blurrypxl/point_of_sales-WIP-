const router = require('express').Router();
const Menu = require('../models/Menu');
const Auth = require('../models/Auth');

const validateToken = function (req, res, next) {
  Auth.validateToken({ token: req.headers['x-access-token'] }, function (err, decoded) {
    if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

    if (decoded.payload.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'access': false, 'msg': 'Access Denied' });

    res.locals.user = decoded.payload;
  });

  next();
}

router.get('/',
  validateToken,
  function (req, res) {
    Menu.findAll(function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

      res.status(200).json(data);
    });
  });

router.post('/create',
  validateToken,
  function (req, res) {
    const dataUser = res.locals.user;

    Menu.create({
      'id_pengguna': dataUser.id_pengguna,
      'nama_menu': req.body.nama_menu,
      'jenis_menu': req.body.jenis_menu,
      'qty_menu': req.body.qty_menu,
      'harga_menu': req.body.harga_menu,
      'ditambah_oleh': dataUser.nama_pengguna
    },
      function (err) {
        if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

        res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil ditambah.' });
      });
  });

router.put('/update/:id',
  validateToken,
  function (req, res, next) {
    Menu.findById({ 'id_menu': req.params.id }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

      res.locals.menu = data;
    });

    next();
  },
  function (req, res) {
    const dataUser = res.locals.user;
    const dataMenu = res.locals.menu;

    Menu.update({
      'nama_user': dataUser.nama_pengguna,
      'nama_menu': req.body.nama_menu === '' ? dataMenu.nama_menu : req.body.nama_menu,
      'jenis_menu': req.body.jenis_menu === '' ? dataMenu.jenis_menu : req.body.jenis_menu,
      'qty_menu': req.body.qty_menu === '' ? dataMenu.qty_menu : req.body.qty_menu,
      'harga_menu': req.body.harga_menu === '' ? dataMenu.harga_menu : req.body.harga_menu
    },
      function (err) {
        if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

        res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil diedit.' });
      });
  });

router.delete('/delete/:id',
  validateToken,
  function (req, res) {
    Menu.delete({ 'id_menu': req.params.id }, function (err) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

      res.status(200).json({ 'status': 200, 'msg': 'Data Menu berhasil dihapus.' });
    });
  }
);

module.exports = router;