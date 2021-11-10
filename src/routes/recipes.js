const recipes = require('express').Router();
const { insert, getAll, getItemById } = require('../utils/index');

recipes.get('/', (req, res, next) => {
  const { name } = req.query;
  getAll(name) // Send numbers
    .then(response => res.send(response))
    .catch(err => next(err));
});

recipes.get('/:id', (req, res, next) => {
  const id = req.params.id;
  getItemById(id)
    .then(item => res.send(item))
    .catch(err => next(err));
});

recipes.post('/', (req, res, next) => {
  const { name, summary, score, healthScore, steps, types } = req.body;
  // Validate
  if (!name || !summary || types.length === 0) res.status(406).json('Name, Summary and types are required');
  // Generate item with the data from body
  const data = { name, summary, score, healthScore, steps };
  insert(data, types)
    .then(item => res.send(item))
    .catch(err => next(err));
});

module.exports = { recipes };
