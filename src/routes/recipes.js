const recipes = require('express').Router();
const { insert, getAll, getItemById } = require('../utils/index');

recipes.get('/', (req, res, next) => {
  const { title } = req.query;
  getAll(title) // Send numbers
    .then(response => res.json({status: 200, data: response}))
    .catch(err => next(err));
});

recipes.get('/:id', (req, res, next) => {
  const id = req.params.id;
  getItemById(id)
    .then(response => res.json({status: 200, data: response}))
    .catch(err => next(err));
});

recipes.post('/', (req, res, next) => {
  const { title, summary, score, healthScore, steps, diets } = req.body;
  
  // Validate
  if (!title || !summary || diets.length === 0) res.status(406).json('Title, Summary and types are required');
  // Generate item with the data from body
  const data = { title, summary, score, healthScore, steps };
  insert(data, diets)
    .then(response => res.json({status: 200, data: response}))
    .catch(err => next(err));
});

module.exports = { recipes };
