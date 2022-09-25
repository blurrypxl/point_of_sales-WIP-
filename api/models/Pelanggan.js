const mysql = require('../connector');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (funcRes) {
    const findAll = `SELECT * FROM pelanggan`;

    mysql.query(findAll, funcRes);
  },
  findById: function (objReq, funcRes) {
    const findById = `SELECT * FROM pelanggan WHERE id_pelanggan='${objReq.id_pelanggan}'`;

    mysql.query(findById, funcRes);
  },
  create: function (objReq, funcRes) {
    const create = `INSERT INTO pelanggan (id_pelanggan, id_pengguna, ditambah_oleh, create_at) VALUES ('${objReq.id_pelanggan}', '${objReq.id_pengguna}', '${objReq.ditambah_oleh}', '${timestamp('HH:mm:YYYY-MM-DD')}')`;

    mysql.query(create, funcRes);
  },
  delete: function (objReq, funcRes) {
    const remove = `DELETE FROM pelanggan WHERE id_pelangan='${objReq.id_pelanggan}'`;

    mysql.query(remove, funcRes);
  }
};