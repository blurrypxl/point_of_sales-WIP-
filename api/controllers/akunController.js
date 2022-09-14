const router = require('express').Router();
const Akun = require('../models/Akun');
const Auth = require('../models/Auth');

router.get('/read',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'msg': 'Access Denied!' });

    Akun.findAll(function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': data });
    });
  });

router.get('/read/:id',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'msg': 'Access Denied!' });

    Akun.findById({ 'id_akun': req.params.id }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

      res.status(200).json({ 'status': 200, 'access': true, 'msg': data });
    });
  });

router.post('/create',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'msg': 'Access Denied!!' });

    Akun.create({
      'id_pengguna': req.body.id_pengguna,
      'password': req.body.password,
      'ditambah_oleh': req.body.ditambah_oleh
    },
      function (err) {
        if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

        res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data akun berhasil ditambahkan.' });
      });
  });

router.put('/update/:id',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'msg': 'Access Denied!' });

    Akun.update({ 'password': req.body.password },
      function (err) {
        if (err) return res.status(500).json({ 'status': 500, 'msg': err.message });

        res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data akun berhasil diupdate.' });
      });
  });

router.delete('/delete/:id',
  Auth.validateToken,
  function (req, res) {
    if (res.locals.user.role !== 'super-admin') return res.status(401).json({ 'status': 401, 'msg': 'Access Denied!' });

    Akun.remove({ 'id_akun': req.params.id },
      function (err) {
        if (err) return res.status(500).json({ 'status': 500, 'msg': err });

        res.status(200).json({ 'status': 200, 'access': true, 'msg': 'Data akun berhasil dihapus.' });
      });
  });

module.exports = router;