const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = function (req, res, next) {
  const getToken = req.headers['x-access-token'];

  if (!getToken) return res.status(401).send({ status: 401, msg: 'ERROR: Pengguna tidak dikenal' });

  jwt.verify(getToken, process.env.SECRET_KEY, function (err, decoded) {
    if (err) return res.status(500).send({ status: 500, msg: err });

    res.locals.payload = decoded;

    next();
  });
}

module.exports = validateToken;