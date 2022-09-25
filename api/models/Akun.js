const mysql = require('../connector');
const bcrypt = require('bcrypt');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (resFunc) {
    const findAll = `SELECT * FROM akun`;

    // Memanggil callback response yang berisikan argument err & data
    mysql.query(findAll, resFunc);
  },
  findById: function (reqObj, resFunc) {
    const findById = `SELECT * FROM akun WHERE id_akun='${reqObj.id_akun}'`;

    mysql.query(findById, resFunc);
  },
  create: function (reqObj, reqFunc) {
    const hashedPassword = bcrypt.hashSync(reqObj.password, 8);

    const create = `INSERT INTO akun (id_akun, id_pengguna, password, role, ditambah_oleh, diedit_oleh, create_at, update_at) VALUES ('${reqObj.id_akun}', '${reqObj.id_pengguna}', '${hashedPassword}', '${reqObj.role}', '${reqObj.ditambah_oleh}', '', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;
  
    mysql.query(create, reqFunc);
  },
  update: function (reqObj, reqFunc) {
    const update = `UPDATE akun SET password='${reqObj.password}', role='${reqObj.role}', diedit_oleh='${reqObj.diedit_oleh}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}'`;

    mysql.query(update, reqFunc);
  },
  delete: function (reqObj, reqFunc) {
    const remove = `DELETE FROM akun WHERE id_akun='${reqObj.id_akun}'`;

    mysql.query(remove, reqFunc);
  }
}