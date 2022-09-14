const mysql = require('../connector');
const timestamp = require('time-stamp');
const gUniqueId = require('generate-unique-id');

module.exports = {
  findAll: function (response) {
    const findAll = `SELECT * FROM menu`;

    mysql.query(findAll, response);
  },
  findById: function (request, response) {
    const findById = `SELECT * FROM menu WHERE id_menu='${request.id_menu}'`;

    mysql.query(findById, response);
  },
  create: function (request, response) {
    const create = `INSERT INTO menu (id_menu, id_pengguna, nama_menu, jenis_menu, qty_menu, harga_menu, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${gUniqueId({ length: 20 })}', '${request.id_akun}', '${nama_menu}', '${request.jenis_menu}', '${request.qty_menu}', '${request.harga_menu}', '${request.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, response);
  },
  update: function (request, response) {
    const update = `UPDATE menu SET nama_menu='${request.nama_menu}', jenis_menu='${request.jenis_menu}', qty_menu='${request.qty_menu}', harga_menu='${request.harga_menu}', diedit_oleh='${request.diedit_oleh}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}'`;

    mysql.query(update, response);
  },
  delete: function (request, response) {
    const remove = `DELETE FROM menu WHERE id_menu='${request.id_menu}'`;

    mysql.query(remove, response);
  }
}