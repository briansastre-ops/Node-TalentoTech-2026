import express from 'express';
import cors from 'cors'; // 1. Importamos CORS

const app = express();
const PORT = 3000;

// ==========================================
// ⚙️ MIDDLEWARES GLOBALES
// ==========================================
app.use(cors()); // Permite solicitudes entre diferentes dominios
app.use(express.json()); // Permite leer el body de las peticiones en formato JSON

// Simulación de base de datos para BugsBusters
const productos = [
    { id: 1, nombre: "Monitor Curvo Samsung 49", categoria: "electronica", precio: 1200 },
    { id: 2, nombre: "Campera Térmica", categoria: "ropa", precio: 150 },
    { id: 3, nombre: "Teclado Mecánico Keychron", categoria: "electronica", precio: 100 },
    { id: 4, nombre: "Reloj Inteligente", categoria: "accesorios", precio: 250 }
];

// ==========================================
// 🚀 RUTAS DE LA API
// ==========================================

// RUTA 1: Bienvenida (HTML)
app.get('/', (req, res) => {
    res.send('<h1>🚀 API de TechLab activa y escuchando...</h1>');
});

// RUTA 2: QUERY PARAMS (Filtros y Búsquedas)
// Se usa para filtrar. Ej: /api/productos?categoria=electronica&maxPrecio=500
app.get('/api/productos', (req, res) => {
    const { categoria, maxPrecio } = req.query; // Capturamos los query params
    let resultados = [...productos];

    // Aplicamos filtro de categoría si el usuario lo envió
    if (categoria) {
        resultados = resultados.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    // Aplicamos filtro de precio máximo si el usuario lo envió
    if (maxPrecio) {
        resultados = resultados.filter(p => p.precio <= Number(maxPrecio));
    }

    res.json({
        mensaje: "Productos filtrados correctamente",
        total: resultados.length,
        data: resultados
    });
});

// RUTA 3: PATH PARAMS (Búsqueda de un elemento específico)
// Se usa para identificar un recurso único. Ej: /api/productos/2
app.get('/api/productos/:id', (req, res) => {
    const { id } = req.params; // Capturamos el parámetro de la ruta

    const productoEncontrado = productos.find(p => p.id === Number(id));

    if (!productoEncontrado) {
        // Retornamos 404 si el ID no existe en nuestro array
        return res.status(404).json({ error: "Producto no encontrado en el inventario." });
    }

    res.json({
        mensaje: "Producto encontrado",
        data: productoEncontrado
    });
});

// ==========================================
// 🛑 MIDDLEWARE DE ERROR 404 (Rutas Inexistentes)
// ==========================================
// IMPORTANTE: Esto siempre debe ir al final, después de todas las rutas válidas.
app.use((req, res) => {
    res.status(404).json({
        error: "404 - Not Found",
        mensaje: "Oops! La ruta que intentas consultar no existe en el servidor de BugsBusters."
    });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});