const { Sequelize } = require('sequelize');
const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false, // Desativa os logs do Sequelize no console
});

module.exports = db;