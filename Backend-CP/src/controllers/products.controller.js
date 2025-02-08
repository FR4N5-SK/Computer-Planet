import { deleteFile, upload } from '../middleware/upload.js';
import Products from '../models/products.model.js';

class ProductsController {
    // Crear productos
    async addProduct(req, res) {
        const { name, description, amount, price, currency, category } = req.body;

        if (!name || !description || !price || !currency || !amount || !category) {
        return res.status(400).json({ status: 400, error: 'Faltan campos obligatorios.' });
        }

        const imagen = req.file ? req.file.filename : null; // Obtener el nombre del archivo si se cargó uno
        if (imagen === null) {
            return res.status(400).json({ status: 400, error: 'Falta una imagen.' });
        }

        try {
        const newProduct = new Products({ name, description, amount, price, currency, image: imagen, category });
        await newProduct.save();
        res.status(201).json({ status: 201, message: 'Producto agregado exitosamente', result: newProduct });
        } catch (error) {
        res.status(500).json({ status: 500, error: 'Error al agregar el producto: ' + error.message });
        }
    }

    // Editar productos
    async editProduct(req, res) {
        const { name, description, amount, price, currency, category } = req.body;

        if (!name || !description || !price || !currency || !amount || !category) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }

        try {
            const product = await Products.findById(req.params.id);
            if (!product) return res.status(404).json({ status: 404, message: 'No existe el producto' });

            if (name) product.name = name;
            if (description) product.description = description;
            if (amount) product.amount = amount;
            if (price) product.price = price;
            if (currency) product.currency = currency
            if (category) product.category = category

            // Manejar la actualización de la imagen
            if (req.file) {
                if (product.image) {
                deleteFile(product.image);
                }
                product.image = req.file.filename;
            }

            await product.save();
            res.status(201).json({ status: 201, message: 'Producto editado exitosamente', result: product });
        } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al editar el producto: ' + error.message });
        }
    }

    // Editar productos
    async addItemCar(req, res) {
        try {
            const product = await Products.findById(req.params.id);
            if (!product) return res.status(404).json({ status: 404, message: 'No existe el producto' });
            if (product.amount - 1 < 0) {
                return res.status(404).json({ status: 404, message: 'Ya no tenemos unidades disponible' });
            }

            if (product.amount) product.amount = product.amount - 1;

            await product.save();
            res.status(201).json({ status: 201, message: 'Producto agregado al carrito exitosamente', result: product });
        } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al editar el producto: ' + error.message });
        }
    }

    // Todos los Productos
    async allProducts(req, res) { 
        try {
            const products = await Products.find();
            res.status(200).json({ status: 200, message: 'Todos los productos traidso exitosamente', result: products});
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al eliminar el usuario: ' + error.message });
        }
    }

    // Eliminar Producto
    async deleteProduct(req, res) { 
        const { id } = req.params

        try {
            const product = await Products.findByIdAndDelete(id);
            if (product != null) {
                return res.status(200).json({ status: 200, message: 'Producto eliminada exitosamente', result: product});
            }
            res.status(400).json({ status: 400, message: 'No existe el producto' });
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error al eliminar el producto: ' + error.message });
        }
    }
}

export default new ProductsController();