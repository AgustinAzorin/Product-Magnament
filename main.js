const express = require('express');
const path = require('node:path');
const productosRouter = require('./app/routes/productoRouter');

const app = express();
const port = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true })); // para forms HTML
app.use(express.json()); // para JSON

// Rutas
app.use('/productos', productosRouter);

// Servir HTML estático
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'templates', 'index.html'));
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});
