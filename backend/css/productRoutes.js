
const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Obtener todos los productos
router.get('/', getProducts);

// Agregar un producto nuevo
router.post('/', addProduct);

// Actualizar un producto por su ID
router.put('/:id', updateProduct);

// Eliminar un producto por su ID
router.delete('/:id', deleteProduct);

module.exports = router;
