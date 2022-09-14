const router = require('express').Router();
const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');
require('dotenv').config();

router.post('/login-master',
  function (req, res) {
    Auth.loginMaster({ 'email_master': req.body.email_master }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      if (data.length === 0) return res.status(400).json({ 'status': 400, 'msg': 'Account not found' });

      const validatePassword = bcrypt.compareSync(req.body.password, data[0].password);

      if (!validatePassword) return res.status(401).json({ 'status': 401, 'auth': false, 'token': null });

      const token = Auth.createToken({
        'payload': {
          'id_master': data[0].id_master,
          'nama_master': data[0].nama_master,
          'email_master': data[0].email_master,
          'role': data[0].role
        }
      });

      res.status(200).json({ 'status': 200, 'auth': true, 'token': token });
    });
  });

router.post('/login',
  function (req, res) {
    Auth.login({ 'email_pengguna': req.body.email_pengguna }, function (err, data) {
      if (err) return res.status(500).json({ 'status': 500, 'msg': err });

      if (data.length === 0) return res.status(400).json({ 'status': 400, 'msg': 'Account not found' });

      const validatePassword = bcrypt.compareSync(req.body.password, data[0].password);

      if (!validatePassword) return res.status(401).json({ 'status': 401, 'auth': false, 'token': null });

      const token = Auth.createToken({
        'payload': {
          'id_pengguna': data[0].id_pengguna,
          'nama_pengguna': data[0].nama_pengguna,
          'email_pengguna': data[0].email_pengguna,
          'role': data[0].role
        }
      });

      res.status(200).json({ 'status': 200, 'auth': true, 'token': token });
    });
  });

module.exports = router;