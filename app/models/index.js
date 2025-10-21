const { sequelize } = require('../utils/db.js');
const { DataTypes } = require('sequelize');
const Producto = require('./product.js')(sequelize, DataTypes);
module.exports = { sequelize, Producto };
