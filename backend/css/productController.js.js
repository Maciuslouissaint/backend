
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Obtener todos los productos
function getProducts(req, res) {
  try {
    const data = readData();
    res.json({ success: true, products: data.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al obtener productos' });
  }
}

// Agregar un producto
function addProduct(req, res) {
  try {
    const { title, price, stock, imageUrl } = req.body;

    if (
      typeof title !== 'string' ||
      !title.trim() ||
      price === undefined ||
      stock === undefined ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res.status(400).json({
        success: false,
        error: 'Ingresa nombre, precio y stock válidos'
      });
    }

    const data = readData();

    const product = {
      id: Date.now().toString(),
      title: title.trim(),
      price: Number(price),
      stock: Number(stock),
      status: Number(stock) > 0 ? 'available' : 'out_of_stock',
      imageUrl: imageUrl || 'https://placehold.co/150'
    };

    data.products.push(product);
    saveData(data);

    res.status(201).json({
      success: true,
      message: 'Producto agregado correctamente',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al agregar producto' });
  }
}

// Editar un producto
function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { title, price, stock, imageUrl } = req.body;
    const data = readData();

    const product = data.products.find(item => item.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
          success: false,
          error: 'El nombre no puede estar vacío'
        });
      }
      product.title = title.trim();
    }

    if (price !== undefined) {
      if (!Number.isFinite(Number(price)) || Number(price) < 0) {
        return res.status(400).json({
          success: false,
          error: 'Precio inválido'
        });
      }
      product.price = Number(price);
    }

    if (stock !== undefined) {
      if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({
          success: false,
          error: 'Stock inválido'
        });
      }
      product.stock = Number(stock);
    }

    if (imageUrl !== undefined) {
      product.imageUrl = imageUrl;
    }

    product.status = product.stock > 0 ? 'available' : 'out_of_stock';
    saveData(data);

    res.json({
      success: true,
      message: 'Producto actualizado correctamente',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al actualizar producto' });
  }
}

// Eliminar un producto
function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const data = readData();
    const index = data.products.findIndex(item => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Producto no encontrado'
      });
    }

    const deletedProduct = data.products.splice(index, 1)[0];
    saveData(data);

    res.json({
      success: true,
      message: 'Producto eliminado correctamente',
      product: deletedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al eliminar producto' });
  }
}

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
};
