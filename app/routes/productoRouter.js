// app/routes/productos.js
const express = require('express');
const router = express.Router();
const { Producto } = require('../models'); // importás tu modelo Sequelize
const validarProducto = require("../utils/middleware.js").validarProducto;

// Crear un producto desde un formulario HTML o JSON
router.post('/', validarProducto, async (req, res) => {
  try {
    console.log('CT:', req.headers['content-type'], 'BODY:', req.body);
    await Producto.create(req.body);
    res.redirect('/'); // o res.json({ message: 'Producto creado' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear el producto');
  }
}); 
router.get('/', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const p = await Producto.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'No encontrado' });
  res.json(p);
});

router.put('/:id', async (req, res) => {
  const p = await Producto.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'No encontrado' });
  await p.update(req.body);
  res.json(p);
});

router.delete('/:id', async (req, res) => {
  const p = await Producto.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'No encontrado' });
  await p.destroy(req.body);
  res.status(200).json({ message: 'Producto eliminado' });
});


module.exports = router;
