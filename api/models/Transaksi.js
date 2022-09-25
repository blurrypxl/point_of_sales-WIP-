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
    const create = `INSERT INTO (id_transaksi, id_pengguna, id_pelanggan, total_tagihan, metode_pembayaran, uang_bayar, kembalian, create_at, ditambah_oleh) VALUES ('${gUniqueId({ length: 20 })}', '${objReq.id_pengguna}', '${objReq.id_pelanggan}', '${objReq.total_tagihan}', '${objReq.metode_pembayaran}', '${objReq.uang_bayar}', '${objReq.kembalian}', '${timestamp('HH:mm:YYYY-MM-DD')}', '${objReq.ditambah_oleh}')`;

    mysql.query(create, funcRes);
  },
  delete: function (objReq, funcRes) {
    const remove = `DELETE FROM transaksi WHERE id_transaksi='${objReq.id_transaksi}'`;

    mysql.query(remove, funcRes);
  }
}