const jwt = require('');
require('dotenv').config();

module.exports = function (req, res, next) {
  const getToken = jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, function (err, decoded) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.locals.decoded = decoded;
  });

  if (!getToken) return res.status(401).send({ status: 401, msg: 'ERROR: Pengguna tidak dikenal' });

  next();
}