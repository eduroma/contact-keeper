const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token found, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};
