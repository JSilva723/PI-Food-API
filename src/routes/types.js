const types = require('express').Router();
const { getTypes } = require('../utils/index');

types.get('/', (_req, res, next) => {
  getTypes() // Get all types in DB
    .then(response => res.json({status: 200, data: response}))
    .catch(err => next(err));
});

module.exports = { types };
