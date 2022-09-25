const Router = require('express').Router();
const bcrypt = require('bcrypt');
const Auth = require('../models/Auth');
require('dotenv').config();

Router.post('/login-master',
  function (req, res, next) {
    Auth.loginMaster({ 'email_master': req.body.email_master }, function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;
  
        return next(error);
      }

      if (data.length === 0) {
        const error = new Error('Account Not Found');

        error.status = 400;
  
        return next(error);
      }

      const validatePassword = bcrypt.compareSync(req.body.password, data[0].password);

      if (!validatePassword) {
        const error = new Error({ 'auth': false, 'token': null });

        error.status = 401;
  
        return next(error);
      }

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

Router.post('/login',
  function (req, res, next) {
    Auth.login({ 'email_pengguna': req.body.email_pengguna }, function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;
  
        return next(error);
      }

      if (data.length === 0) {
        const error = new Error('Account Not Found');

        error.status = 400;
  
        return next(error);
      }

      const validatePassword = bcrypt.compareSync(req.body.password, data[0].password);

      if (!validatePassword) {
        const error = new Error({ 'auth': false, 'token': null });

        error.status = 401;
  
        return next(error);
      }

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

module.exports = Router;