import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Usamos el router modular
app.use('/api/products', productRoutes);

// Middleware 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada en el servidor de BugsBusters" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor profesional corriendo en http://localhost:${PORT}`);
});