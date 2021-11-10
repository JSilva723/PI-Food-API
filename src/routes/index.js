const routes = require('express').Router();
const { recipes } = require('./recipes');
const { types } = require('./types');
const handleErrors = require('./handleErrors');

routes.use('/recipes', recipes); // Routes of recipes
routes.use('/types', types); // Route of type
routes.use((_req, res) => res.status(404).json('Not found'));
routes.use(handleErrors); // Error catching endware.

module.exports = { routes };
