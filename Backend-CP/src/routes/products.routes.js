import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import ProductsController from '../controllers/products.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Ruta agregar productos
router.post('/add', authMiddleware(['admin']), upload.single('image'), ProductsController.addProduct);
// Ruta agregar productos
router.put('/update/:id', authMiddleware(['admin']), upload.single('image'), ProductsController.editProduct);
// Ruta para listar todas las productos
router.get('/all', authMiddleware(['user', 'admin']), ProductsController.allProducts);
// Ruta para listar eliminar las productos
router.delete('/delete/:id', authMiddleware(['admin']), ProductsController.deleteProduct);
// Ruta para agregar al carrito los productos
router.post('/car/:id', authMiddleware(['admin', 'user']), ProductsController.addItemCar);

export default router;