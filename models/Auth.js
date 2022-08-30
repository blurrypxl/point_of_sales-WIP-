const mysql = require('../database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Auth = function (obj) {
  this.objReq = obj;
}

Auth.prototype.login = function (funcReq) {
  const findByValue = `SELECT * FROM akun WHERE email='${this.objReq.email}'`;

  mysql.query(findByValue, funcReq);
}

Auth.prototype.createToken = function () {
  jwt.sign(this.objReq.payload, process.env.SECRET_KEY, { expiresIn: '8h' });
}

module.exports = Auth;