module.exports = (sequelize, DataTypes) => sequelize.define('Producto', {
  nombre: { type: DataTypes.STRING, allowNull:false, unique:true },
  cantidad:  { type: DataTypes.INTEGER, allowNull:false, defaultValue:1, validate:{ min:1 } },
  precio:   { type: DataTypes.INTEGER, allowNull:false, defaultValue:1, validate:{ min:1 } },
  activo: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue:true }
}, { tableName:'productos', underscored:true, timestamps:true });
