const mysql = require('../connector');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  loginMaster: function (reqObj, resFunc) {
    const findByValue = `SELECT * FROM master WHERE email_master='${reqObj.email_master}'`;

    mysql.query(findByValue, resFunc);
  },
  login: function (reqObj, resFunc) {
    const findByValue = `SELECT akun.id_pengguna, pengguna.email_pengguna, akun.role, akun.password FROM akun JOIN pengguna ON akun.id_pengguna=pengguna.id_pengguna WHERE pengguna.email_pengguna='${reqObj.email_pengguna}'`;

    mysql.query(findByValue, resFunc);
  },
  createToken: function (reqObj) {
    return jwt.sign(reqObj.payload, process.env.SECRET_KEY, { expiresIn: '8h' });
  },
  validateToken: function (req, res, next) {
    jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, { complete: true, maxAge: '1h' }, function (err, decoded) {
      if (err) {
        const error = new Error('Token Not Provided/Token Expired');

        error.status = 400;

        return next(error);
      }

      res.locals.user = decoded.payload;
    });

    next();
  }
}