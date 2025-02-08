import Users from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import { constants } from 'buffer';
import jwt from 'jsonwebtoken';

class UserController {
  // Registro de usuario
  async registerUser(req, res) {
    const { name, lastname, email, phone = "Sin telefono", location = "Sin ubicacion", username, password, role = 'user' } = req.body;
    if (!name || !username || !password || !lastname || !email) {
      return res.status(400).json({ status: 400, message: "Todos los campos son obligatorios." });
    }

    // Aqui verificamos que el usuario tenga una estructura valida
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!username.match(usernameRegex) || username.includes(' ')) {
      return res.status(400).json({ status: 400, message: 'El nombre de usuario no es válido. Solo puede contener letras, números, guiones bajos, puntos y guiones, y no puede contener espacios.' });
    }

    // Aqui verificamos que la clave tenga un formato valido
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,128}$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({ status: 400, message: 'La contraseña debe tener entre 8 y 128 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y no puede contener espacios.' });
    }

    try {
        // Hasheamos la clave
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new Users({ name, lastname, email, phone, location, username, password: hashedPassword, role });

        await newUser.save();
        res.status(201).json({ status:200, message: 'Usuario creado exitosamente', user: {name, lastname, email, phone, location, username}});

    } catch (error) {
      res.status(500).json({ status: 500, message: 'Error al crear el usuario: ' + error.message });
    }
  }

    // Inicio de sesión
    async loginUser(req, res) {
        const { username, password } = req.body;
    
        try {
          const user = await Users.findOne({ username });
    
          if (!user) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
    
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
          if (!isPasswordCorrect) return res.status(400).json({ status: 400, message: 'Credenciales inválidas' });
    
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
          res.status(200).json({ status: 200, result: user, token, message: 'Has iniciado sesión exitosamente' });
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Error al iniciar sesión: ' + error.message });
        }
    }


    // Recuperar Contraseña
    async resetPassword(req, res) {
        const { username, password } = req.body;
        console.log(password)

            // Aqui verificamos que la clave tenga un formato valido
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,128}$/;
            if (!password.match(passwordRegex)) {
                return res.status(400).json({ status: 400, message: 'La contraseña debe tener entre 8 y 128 caracteres, e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y no puede contener espacios.' });
            }
        
        try {
            const user = await Users.findOne({ username });
        
            if (!user) return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });

            // Hasheamos la clave
            const hashedPassword = await bcrypt.hash(password, 12);
            
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ status: 200, message: 'Clave cambiada correctamente'});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al iniciar sesión: ' + error.message });
        }
    }

    // Actualizar un usuario
    async updateUser(req, res) {
        const { name, lastname, email, phone, location } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
        try {
            const user = await Users.findById(decoded.id);
            // Actualizamos el perfil
            if (name) user.name = name
            if (lastname) user.lastname = lastname
            if (email) user.email = email
            if (phone) user.phone = phone
            if (location) user.location = location

            await user.save()
            res.status(200).json({ status: 200, message: 'Usuario editado exitosamente', result: user});
        } catch (error) {
            res.status(500).json({ status: 500, error: 'Error al editar el perfil: ' + error.message });
        }
    }

    // Todos los usuarios
    async allUsers(req, res) { 
        try {
            const users = await Users.find();
            res.status(200).json({ status: 200, message: 'Usuarios Listados exitosamente', result: users});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al listar los usuarios: ' + error.message });
        }
    }

    // Eliminar un usuario
    async deleteUser(req, res) { 
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        try {
            const deleteUser = await Users.findByIdAndDelete(decoded.id);
            res.status(200).json({ status: 200, message: 'Usuario eliminado exitosamente', result: deleteUser});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al eliminar el usuario: ' + error.message });
        }
    }
}

export default new UserController();