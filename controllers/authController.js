const router = require('express').Router();
const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');
require('dotenv').config();

router.post('/login', function (req, res) {
  const auth = new Auth({ 'email': req.body.email });

  auth.login(function (err, data) {
    if (err) return res.status(500).send({ 'status': 500, 'msg': err });

    if (!data) return res.status(400).send({ 'status': 400, 'msg': 'Account not found' });

    const validatePassword = bcrypt.compareSync(req.body.password, data.password);

    if (!validatePassword) return res.status(401).send({ 'status': 401, 'auth': false, 'token': null });

    const token = new Auth({
      'payload': {
        'id_pegawai': data.id_pegawai,
        'nama_pegawai': data.nama_pegawai,
        'email_pegawai': data.email_pegawai,
        'role': data.role
      }
    });

    res.status(200).send({ 'status': 200, 'auth': true, 'token': token.createToken() });
  });
});

module.exports = router;