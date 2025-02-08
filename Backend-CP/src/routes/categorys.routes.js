import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Ruta para listar todas las categorias
router.get('/all', authMiddleware(['admin']), CategoryController.allCategory);
// Ruta para listar eliminar las categorias
router.delete('/delete/:id', authMiddleware(['admin']), CategoryController.deleteCategory);
// Ruta para listar todas las categorias
router.post('/add', authMiddleware(['admin']), CategoryController.addCategory);

export default router;