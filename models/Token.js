const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Token = function (obj) {
  this.objReq = obj;
}

Token.prototype.create = function () {
  jwt.sign(this.objReq.payload, process.env.SECRET_KEY, { expiresIn: '8h' });
}

Token.prototype.validate = function () {
  jwt.verify(this.objReq.header, process.env.SECRET_KEY);
}

module.exports = Token;