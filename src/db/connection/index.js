require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DATABASE_URL } = process.env // eslint-disable-line
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
});

module.exports = { sequelize };
