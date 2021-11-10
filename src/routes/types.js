const types = require('express').Router();
const { getTypes } = require('../utils/index');

types.get('/', (_req, res, next) => {
  getTypes() // Get all types in DB
    .then(response => res.json(response))
    .catch(err => next(err));
});

module.exports = { types };
