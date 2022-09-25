const mysql = require('../connector');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (resFunc) {
    const findAll = `SELECT * FROM menu ORDER BY create_at DESC`;

    mysql.query(findAll, resFunc);
  },
  findById: function (reqObj, resFunc) {
    const findById = `SELECT * FROM menu WHERE id_menu='${reqObj.id_menu}'`;

    mysql.query(findById, resFunc);
  },
  create: function (reqObj, resFunc) {
    const create = `INSERT INTO menu (id_menu, id_master, nama_menu, jenis_menu, qty_menu, harga_menu, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${reqObj.id_menu}', '${reqObj.id_master}', '${reqObj.nama_menu}', '${reqObj.jenis_menu}', '${reqObj.qty_menu}', '${reqObj.harga_menu}', '${reqObj.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, resFunc);
  },
  update: function (reqObj, resFunc) {
    const update = `UPDATE menu SET nama_menu='${reqObj.nama_menu}', jenis_menu='${reqObj.jenis_menu}', qty_menu='${reqObj.qty_menu}', harga_menu='${reqObj.harga_menu}', diedit_oleh='${reqObj.diedit_oleh}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}'`;

    mysql.query(update, resFunc);
  },
  delete: function (reqObj, resFunc) {
    const remove = `DELETE FROM menu WHERE id_menu='${reqObj.id_menu}'`;

    mysql.query(remove, resFunc);
  }
}