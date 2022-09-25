const mysql = require('../connector');
const timestamp = require('time-stamp');
const bcrypt = require('bcrypt');

module.exports = {
  findAll: function (resFunc) {
    const findAll = `SELECT * FROM master`;

    mysql.query(findAll, resFunc);
  },
  findById: function (resFunc) {
    const findById = `SELECT * FROM master WHERE id_master='${this.reqObj.id_master}'`;

    mysql.query(findById, resFunc);
  },
  create: function (reqObj, resFunc) {
    const hashedPassword = bcrypt.hashSync(reqObj.password, 8);

    const create = `INSERT INTO master (id_master, nama_master, email_master, alamat_master, password, role, create_at, update_at) VALUES ('${reqObj.id_master}', '${reqObj.nama_master}', '${reqObj.email_master}', '${reqObj.alamat_master}', '${hashedPassword}', '${reqObj.role}', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, resFunc);
  },
  update: function (reqObj, resFunc) {
    const update = `UPDATE master SET nama_master='${reqObj.nama_master}', email_master='${reqObj.email_master}', alamat_master='${reqObj.alamat_master}', password='${reqObj.password}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}' WHERE id_master='${reqObj.id_master}'`;

    mysql.query(update, resFunc);
  }
}