const db = require('../db');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Task = db.define('task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Task;