import express from 'express';
const router = express.Router();

// Ruta HTML: Bienvenida
router.get('/welcome', (req, res) => {
    res.send('<h1>🚀 Bienvenido a la sección de Productos</h1>');
});

// Ruta JSON: Status de la API
router.get('/status', (req, res) => {
    res.json({
        message: "Ruta de productos operativa",
        database: "Firestore"
    });
});

export default router;