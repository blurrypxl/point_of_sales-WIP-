const mysql = require('../connector');
const timestamp = require('time-stamp');
const gUniqueId = require('generate-unique-id');
const bcrypt = require('bcrypt');

module.exports = {
  findAll: function (response) {
    const findAll = `SELECT * FROM master`;

    mysql.query(findAll, response);
  },
  findById: function (response) {
    const findById = `SELECT * FROM master WHERE id_master='${this.objReq.id_master}'`;

    mysql.query(findById, response);
  },
  create: function (objReq, response) {
    const hashedPassword = bcrypt.hashSync(objReq.password, 8);

    const create = `INSERT INTO master (id_master, nama_master, email_master, alamat_master, password, role, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${objReq.nama_master}', '${objReq.email_master}', '${objReq.alamat_master}', '${hashedPassword}', '${objReq.role}', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

    mysql.query(create, response);
  },
  update: function (objReq, response) {
    const update = `UPDATE master SET nama_master='${objReq.nama_master}', email_master='${objReq.email_master}', alamat_master='${objReq.alamat_master}', password='${objReq.password}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}' WHERE id_master='${objReq.id_master}'`;

    mysql.query(update, response);
  }
}

// const Master = function (obj) {
//   this.objReq = obj;
// }

// Master.prototype.findAll = function (response) {
//   const findAll = `SELECT * FROM master`;

//   mysql.query(findAll, response);
// }

// Master.prototype.findById = function (response) {
//   const findById = `SELECT * FROM master WHERE id_master='${this.objReq.id_master}'`;

//   mysql.query(findById, response);
// }

// Master.prototype.create = function (response) {
//   const hashedPassword = bcrypt.hashSync(this.objReq.password, 8);

//   const create = `INSERT INTO master (id_master, nama_master, email_master, alamat_master, password, role, create_at, update_at) VALUES ('${gUniqueId({ 'length': 20 })}', '${this.objReq.nama_master}', '${this.objReq.email_master}', '${this.objReq.alamat_master}', '${hashedPassword}', '${this.objReq.role}', '${timestamp('HH:mm:YYYY-MM-DD')}', '')`;

//   mysql.query(create, response);
// }

// Master.prototype.update = function (response) {
//   const update = `UPDATE master SET nama_master='${this.objReq.nama_master}', email_master='${this.objReq.email_master}', alamat_master='${this.objReq.alamat_master}', password='${this.objReq.password}', update_at='${timestamp('HH:mm:YYYY-MM-DD')}'`;

//   mysql.query(update, response);
// }

// module.exports = Master;