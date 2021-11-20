const { sequelize } = require('../connection/index');
const { DataTypes } = require('sequelize');
const { Type } = require('./Type');

const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true }
  },
  summary: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { notEmpty: true }
  },
  img: { type: DataTypes.STRING, defaultValue: 'https://spoonacular.com/recipeImages/716426-312x231.jpg' },
  score: { type: DataTypes.INTEGER },
  healthScore: { type: DataTypes.INTEGER },
  steps: { type: DataTypes.JSON },
}, {
  timestamps: false
});

Recipe.belongsToMany(Type, { through: 'RecipeType', timestamps: false });
Type.belongsToMany(Recipe, { through: 'RecipeType', timestamps: false });

module.exports = { Recipe };