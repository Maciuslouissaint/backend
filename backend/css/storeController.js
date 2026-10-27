
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

// Leer los datos de la tienda
function readData() {
  const rawData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(rawData);
}

// Obtener la tienda por su slug
function getStoreBySlug(req, res) {
  try {
    const { slug } = req.params;
    const data = readData();

    if (!data.store || data.store.slug !== slug) {
      return res.status(404).json({
        success: false,
        error: 'Tienda no encontrada'
      });
    }

    res.json({
      success: true,
      store: data.store,
      products: data.products
    });
  } catch (error) {
    console.error('Error al cargar la tienda:', error);

    res.status(500).json({
      success: false,
      error: 'Error al obtener los datos de la tienda'
    });
  }
}

module.exports = {
  getStoreBySlug
};


const express = require('express');
const router = express.Router();

const {
  getStoreBySlug
} = require('../controllers/storeController');

// Obtener una tienda por su slug
router.get('/:slug', getStoreBySlug);

module.exports = router;
