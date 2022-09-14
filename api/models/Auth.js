const mysql = require('../connector');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  loginMaster: function (reqObj, resFunc) {
    const findByValue = `SELECT * FROM master WHERE email_master='${req.email_master}'`;

    mysql.query(findByValue, res);
  },
  login: function (reqObj, resFunc) {
    const findByValue = `SELECT akun.id_pengguna, pengguna.email_pengguna, akun.role FROM akun JOIN pengguna ON akun.id_pengguna=pengguna.id_pengguna WHERE pengguna.email_pengguna='${req.email_pengguna}'`;

    mysql.query(findByValue, res);
  },
  createToken: function (reqObj) {
    return jwt.sign(reqObj.payload, process.env.SECRET_KEY, { expiresIn: '8h' });
  },
  validateToken: function (req, res, next) {
    jwt.verify(req.header['x-access-token'], process.env.SECRET_KEY, { complete: true, maxAge: '1h' },function (err, decoded) {
      if (err) return res.status(400).json({ 'status': 400, 'msg': 'Token Expired/Token Not Provided.', 'fullmsg': err });
  
       res.locals.user = decoded.payload;

       next();
    });
  }
}