const mysql = require('../database');
const timestamp = require('time-stamp');
const gUniqueId = require('generate-unique-id');
const bcrypt = require('bcrypt');

const Pemilik = function (obj) {
  this.objReq = obj;
}

Pemilik.prototype.findAll = function (funcMsg) {
  const findAll = `SELECT * FROM pemilik`;

  mysql.query(findAll, funcMsg);
}

Pemilik.prototype.findById = function (funcMsg) {
  const findById = `SELECT * FROM pemilik WHERE id_pemilik='${this.objReq.id_pemilik}'`;

  mysql.query(findById, funcMsg);
}

Pemilik.prototype.create = function (funcMsg) {
  const hashedPassword = bcrypt.hashSync(this.objReq.password, 8);

  const create = `INSERT INTO pemilik (id_pemilik, nama_pemilik, email_pemilik, alamat_pemilik, password, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${this.objReq.nama_pemilik}', '${this.objReq.email_pemilik}', '${this.objReq.alamat_pemilik}', '${hashedPassword}', '${timestamp('HH:mm:YYYY-MM-DD')}'), ''`;

  mysql.query(create, funcMsg);
}

Pemilik.prototype.update = function (funcMsg) {

}

Pemilik.prototype.delete = function (funcMsg) {

}

module.exports = Pemilik;