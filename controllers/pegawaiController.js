const router = require('express').Router();
const Pegawai = require('../models/Pegawai');

router.get('/read-pegawai', function (req, res) {
  const pegawai = new Pegawai();

  pegawai.findAll(function (err, data) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.status(200).send(data);
  });
});

router.get('/readbyid-pegawai/:id', function (req, res) {
  const pegawai = new Pegawai({ id_pegawai: req.params.id_pegawai });

  pegawai.findById(function (err, data) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.status(200).send(data);
  });
});

router.post('/create-pegawai', function (req, res) {
  const pegawai = new Pegawai({
    'nama_pegawai': req.body.nama_pegawai,
    'email_pegawai': req.body.email_pegawai,
    'alamat_pegawai': req.body.alamat_pegawai,
    'jabatan': req.body.jabatan,
    'ditambah_oleh': req.body.ditambah_oleh
  });

  pegawai.create(function (err) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.status(200).send({ status: 200, msg: 'Data Pegawai berhasil ditambah.' });
  });
});

router.put('/update-pegawai/:id',
  function (req, res, next) {
    // Get all data pegawai
    const pegawai = new Pegawai({ id_pegawai: req.params.id });

    pegawai.findById(function (err, data) {
      if (err) return res.status(500).send({ status: 500, msg: err });

      res.locals.dataPegawai = data;

      next();
    });
  }),
  function (req, res) {
    // Update data pegawai
    const pegawai = new Pegawai({
      'nama_pegawai': req.body.nama_pegawai === '' ? res.locals.dataPegawai.nama_pegawai : req.body.nama_pegawai,
      'email_pegawai': req.body.email_pegawai === '' ? res.locals.dataPegawai.email_pegawai : req.body.email_pegawai,
      'alamat_pegawai': req.body.alamat_pegawai === '' ? res.locals.dataPegawai.alamat_pegawai : req.body.alamat_pegawai,
      'jabatan': req.body.alamat_pegawai === '' ? res.locals.dataPegawai.jabatan : req.body.alamat_pegawai
    });

    pegawai.update(function (err) {
      if (err) return res.status(500).send({ status: 500, msg: err });

      res.status(200).send({ status: 200, msg: 'Data Pegawai berhasil diupdate.' });
    });
  };

router.delete('/delete-pegawai/:id', function (req, res) {
  const pegawai = new Pegawai({ id_pegawai: req.params.id });

  pegawai.remove(function (err) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.status(200).send({ status: 200, msg: 'Data pelanggan berhasil dihapus.' });
  });
});

module.exports = router;