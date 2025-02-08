import express from 'express';
import UserController from '../controllers/users.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Rutas para registrar usuarios
router.post('/register', UserController.registerUser);

// Ruta para iniciar sesión
router.post('/login', UserController.loginUser);

// Ruta para cambiar clave
router.put('/renew-password', authMiddleware(['user', 'admin']), UserController.resetPassword);
// Ruta para actualizar perfil
router.put('/update', authMiddleware(['user', 'admin']), UserController.updateUser);
// Ruta para listar todos los usuarios
router.get('/all', authMiddleware(['admin']), UserController.allUsers);
// Ruta para eliminar usuarios
router.delete('/delete', authMiddleware(['user', 'admin']), UserController.deleteUser);

export default router;