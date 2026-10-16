const fs = require('fs');
const path = require('path');

// Ruta temporal para probar el catálogo de CAAM Stock con JSON
app.get('/api/store/:slug', (req, res) => {
  const { slug } = req.params;
  
  // Leemos el archivo JSON local de prueba
  const filePath = path.join(__dirname, 'data', 'products.json');
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  if (data.store.slug === slug) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Tienda no encontrada' });
  }
});