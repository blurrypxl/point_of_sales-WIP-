const Router = require('express').Router();
const GenerateId = require('generate-unique-id');
const Pelanggan = require('../models/Pelanggan');
const Transaksi = require('../models/Transaksi');
const Auth = require('../models/Auth');
const Pesanan = require('../models/Pesanan');

Router.get('/read',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user !== ('super-admin' || 'kasir')) {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Transaksi.findAll(function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.status(200).json({ 'status': 200, 'msg': data });
    });
  });

Router.get('/read/:id',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== ('super-admin' || 'kasir')) {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    Transaksi.findById({ 'id_transaksi': req.params.id }, function (err, data) {
      if (err) {
        const error = new Error(err.message);

        error.status = 500;

        return next(error);
      }

      res.status(200).json({ 'status': 200, 'msg': data });
    });
  });

Router.post('/create',
  Auth.validateToken,
  function (req, res, next) {
    if (res.locals.user.role !== 'kasir') {
      const error = new Error('Access Denied!');

      error.status = 401;

      return next(error);
    }

    const idPelanggan = GenerateId({ 'length': 20 });

    Pelanggan.create({
      'id_pelanggan': idPelanggan,
      'id_pengguna': res.locals.user.id_pengguna,
      'ditambah_oleh': res.locals.user.nama_pengguna
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.locals.idPelanggan = idPelanggan;

        // res.status(200).json({ 'status': 200, 'msg': 'Data Pelanggan berhasil ditambah.' });
      });

    next();
  },
  function (req, res, next) {
    req.body.pesanan.forEach(function (item) {
      Pesanan.create({
        'id_pesanan': GenerateId({ 'length': 20 }),
        'id_menu': item.id_menu,
        'id_pelanggan': res.locals.idPelanggan,
        'nama_pesanan': item.nama_pesanan,
        'qty_pesanan': item.qty_pesanan,
        'harga_satuan': item.harga_satuan,
        'sub_total': item.sub_total,
        'ditambah_oleh': res.locals.user.nama_pengguna
      },
        function (err) {
          if (err) {
            const error = new Error(err.message);

            error.status = 500;

            return next(error);
          };

          // res.status(200).json({ 'status': 200, 'msg': 'Data Pesanan berhasil ditambah.' });
        });
    });

    next();
  },
  function (req, res) {
    Transaksi.create({
      'id_transaksi': GenerateId({ 'length': 20 }),
      'id_pengguna': res.locals.user.id_pengguna,
      'id_pelanggan': res.locals.idPelanggan,
      'total_tagihan': req.body.total_tagihan,
    },
      function (err) {
        if (err) {
          const error = new Error(err.message);

          error.status = 500;

          return next(error);
        }

        res.status(200).json({ 'status': 200, 'msg': 'Data Pelanggan, Pesanan & Transaksi berhasil ditambah.' });
      });
  });

module.exports = Router;