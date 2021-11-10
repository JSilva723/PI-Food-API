const { sequelize } = require('../connection/index');
const { DataTypes } = require('sequelize');

const Type = sequelize.define('type', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = { Type };
