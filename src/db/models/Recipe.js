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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true }
  },
  summary: { type: DataTypes.TEXT, allowNull: false },
  img: { type: DataTypes.STRING, defaultValue: 'https://placeimg.com/100/100/any' },
  score: { type: DataTypes.INTEGER },
  healthScore: { type: DataTypes.INTEGER },
  steps: { type: DataTypes.JSON },
  created: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
}, {
  timestamps: false
});

Recipe.belongsToMany(Type, { through: 'RecipeType', timestamps: false });
Type.belongsToMany(Recipe, { through: 'RecipeType', timestamps: false });

module.exports = { Recipe };