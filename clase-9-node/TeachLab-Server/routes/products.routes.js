import { Router } from 'express';
import * as ProductController from '../controllers/product.controller.js';

const router = Router();

// Definimos las rutas y vinculamos al controlador
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getOneProduct);

export default router;