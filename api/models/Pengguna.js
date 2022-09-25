const mysql = require('../connector');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (resFunc) {
    const findAll = `SELECT * FROM pengguna`;

    mysql.query(findAll, resFunc);
  },
  findById: function (reqObj, resFunc) {
    const findById = `SELECT * FROM pengguna WHERE id_pengguna='${reqObj.id_pengguna}'`;

    mysql.query(findById, resFunc);
  },
  create: function (reqObj, resFunc) {
    const create = `INSERT INTO pengguna (id_pengguna, nama_pengguna, email_pengguna, alamat_pengguna, jabatan, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${reqObj.id_pengguna}', '${reqObj.nama_pengguna}', '${reqObj.email_pengguna}', '${reqObj.alamat_pengguna}', '${reqObj.jabatan}', '${reqObj.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, resFunc);
  },
  update: function (reqObj, resFunc) {
    const update = `UPDATE pengguna SET nama_pengguna='${reqObj.nama_pengguna}', email_pengguna='${reqObj.email_pengguna}', alamat_pengguna='${reqObj.alamat_pengguna}', jabatan='${reqObj.jabatan}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}' WHERE id_pengguna='${reqObj.id_pengguna}'`;

    mysql.query(update, resFunc);
  },
  delete: function (reqObj, resFunc) {
    const remove = `DELETE FROM pengguna WHERE id_pengguna='${reqObj.id_pengguna}'`;

    mysql.query(remove, resFunc);
  }
}