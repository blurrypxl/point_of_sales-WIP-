const mysql = require('../connector');
const timestamp = require('time-stamp');
const gUniqueId = require('generate-unique-id');

module.exports = {
  findAll: function (funcRes) {
    const findAll = `SELECT * FROM transaksi`;

    mysql.query(findAll, funcRes);
  },
  findById: function (objReq, funcRes) {
    const findById = `SELECT * FROM transaksi WHERE id_transaksi='${objReq.id_transaksi}'`;

    mysql.query(findById, funcRes);
  },
  create: function (objReq, funcRes) {
    const create = `INSERT INTO () VALUES ()`;

    mysql.query(create, funcRes);
  },
  update: function (objReq, funcRes) {
    const update = ``;

    mysql.query(update, funcRes);
  },
  delete: function (objReq, funcRes) {
    const remove = `DELETE FROM transaksi WHERE id_transaksi='${objReq.id_transaksi}'`;

    mysql.query(remove, funcRes);
  }
}