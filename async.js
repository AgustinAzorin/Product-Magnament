const { sequelize, Producto } = require('./app/models');


(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); // crea/ajusta tablas
  const p = await Producto.create({ nombre:'Cama', cantidad:1, precio: 250 });
  console.log('✅ Insertado:', p.toJSON());
  process.exit(0);
})();
