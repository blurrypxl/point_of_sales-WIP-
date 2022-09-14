const mysql = require('../connector');
const gUniqueId = require('generate-unique-id');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (res) {
    const findAll = `SELECT * FROM pengguna`;

    mysql.query(findAll, res);
  },
  findById: function (req, res) {
    const findById = `SELECT * FROM pengguna WHERE id_pengguna='${req.id_pengguna}'`;

    mysql.query(findById, res);
  },
  create: function (req, res) {
    const create = `INSERT INTO pengguna (id_pengguna, nama_pengguna, email_pengguna, alamat_pengguna, jabatan, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${req.nama_pengguna}', '${req.email_pengguna}', '${req.alamat_pengguna}', '${req.jabatan}', '${req.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, res);
  },
  update: function (req, res) {
    const update = `UPDATE pengguna SET nama_pengguna='${req.nama_pengguna}', email_pengguna='${req.email_pengguna}', alamat_pengguna='${req.alamat_pengguna}', jabatan='${req.jabatan}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}' WHERE id_pengguna='${req.id_pengguna}'`;

    mysql.query(update, res);
  },
  delete: function (req, res) {
    const remove = `DELETE FROM pengguna WHERE id_pengguna='${this.objReq.id_pengguna}'`;

    mysql.query(remove, res);
  }
}

// const Pengguna = function (obj) {
//   this.objReq = obj;
// }

// Pengguna.prototype.findAll = function (response) {
//   const findAll = `SELECT * FROM pengguna`;

//   mysql.query(findAll, response);
// }

// Pengguna.prototype.findById = function (response) {
//   const findById = `SELECT * FROM pengguna WHERE id_pengguna='${this.objReq.id_pengguna}'`;

//   mysql.query(findById, response);
// }

// Pengguna.prototype.create = function (response) {
//   const create = `INSERT INTO pengguna (id_pengguna, nama_pengguna, email_pengguna, alamat_pengguna, jabatan, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${this.objReq.nama_pengguna}', '${this.objReq.email_pengguna}', '${this.objReq.alamat_pengguna}', '${this.objReq.jabatan}', '${this.objReq.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

//   mysql.query(create, response);
// }

// Pengguna.prototype.update = function (response) {
//   const update = `UPDATE pengguna SET nama_pengguna='${this.objReq.nama_pengguna}', email_pengguna='${this.objReq.email_pengguna}', alamat_pengguna='${this.objReq.alamat_pengguna}', jabatan='${this.objReq.jabatan}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}' WHERE id_pengguna='${this.objReq.id_pengguna}'`;

//   mysql.query(update, response);
// }

// Pengguna.prototype.remove = function (response) {
//   const remove = `DELETE FROM pengguna WHERE id_pengguna='${this.objReq.id_pengguna}'`;

//   mysql.query(remove, response);
// }

// module.exports = Pengguna;