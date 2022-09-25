const mysql = require('../connector');
const timestamp = require('time-stamp');

module.exports = {
  findAll: function (funcRes) {
    const findAll = `SELECT * FROM pesanan`;

    mysql.query(findAll, funcRes);
  },
  findById: function (objReq, funcRes) {
    const findById = `SELECT * FROM pesanan WHERE id_pesanan='${objReq.id_pesanan}'`;

    mysql.query(findById, funcRes);
  },
  create: function (objReq, funcRes) {
    const create = `INSERT INTO pesanan (id_pesanan, id_menu, id_pelanggan, nama_pesanan, qty_pesanan, harga_satuan, sub_total, create_at, ditambah_oleh) VALUES ('${objReq.id_pesanan}', '${objReq.id_menu}', '${objReq.id_pelanggan}', '${objReq.nama_pesanan}', '${objReq.qty_pesanan}', '${objReq.harga_satuan}', '${objReq.sub_total}', '${timestamp('HH:mm:YYYY-MM-DD')}', '${objReq.ditambah_oleh}')`;

    mysql.query(create, funcRes);
  }
};