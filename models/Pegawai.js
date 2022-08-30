const mysql = require('../database');
const gUniqueId = require('generate-unique-id');
const timestamp = require('time-stamp');

const Pegawai = function (obj) {
  this.objReq = obj;
}

Pegawai.prototype.findAll = function (funcMsg) {
  const findAll = `SELECT * FROM pegawai`;

  mysql.query(findAll, funcMsg);
}

Pegawai.prototype.findById = function (funcMsg) {
  const findById = `SELECT * FROM pegawai WHERE id_pegawai='${this.objReq.id_pegawai}'`;

  mysql.query(findById, funcMsg);
}

Pegawai.prototype.create = function (funcMsg) {
  const create = `INSERT INTO pegawai (id_pegawai, nama_pegawai, email_pegawai, alamat_pegawai, jabatan, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${this.objReq.nama_pegawai}', '${this.objReq.email_pegawai}', '${this.objReq.alamat_pegawai}', '${this.objReq.jabatan}', '${this.objReq.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '${timestamp('HH:mm:YYYY-MM-DD')}')`;

  mysql.query(create, funcMsg);
}

Pegawai.prototype.update = function (funcMsg) {
  const update = `UPDATE pegawai SET nama_pegawai='${this.objReq.nama_pegawai}', email_pegawai='${this.objReq.email_pegawai}', alamat_pegawai='${this.objReq.alamat_pegawai}', jabatan='${this.objReq.jabatan}' WHERE id_pegawai='${this.objReq.id_pegawai}'`;

  mysql.query(update, funcMsg);
}

Pegawai.prototype.remove = function (funcMsg) {
  const remove = `DELETE FROM pegawai WHERE id_pegawai='${this.objReq.id_pegawai}'`;

  mysql.query(remove, funcMsg);
}

module.exports = Pegawai;