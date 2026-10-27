
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración del servidor
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);

// Ruta principal para comprobar que funciona
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenido a la API de CAAM Stock 🚀'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `Servidor de CAAM Stock funcionando en http://localhost:${PORT}`
  );
});
