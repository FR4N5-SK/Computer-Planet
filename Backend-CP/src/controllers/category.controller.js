import Categorys from '../models/category.model.js';

class CategoryController {
    // Agregar Categoria
    async addCategory(req, res) { 
        const { category } = req.body

        if (!category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
          }
        try {
            const cat = new Categorys({ category })

            await cat.save();
            res.status(200).json({ message: 'Categoría agregada exitosamente', result: cat});
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message });
        }
    }

    // Eliminar Categoria
    async deleteCategory(req, res) { 
        const { id } = req.params

        try {
            const cat = await Categorys.findByIdAndDelete(id);
            if (cat != null) {
                return res.status(200).json({ message: 'Categoría eliminada exitosamente', result: cat});
            }
            res.status(400).json({ error: 'No existe la categoria' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message });
        }
    }

    // Todas las Categorias
    async allCategory(req, res) { 
        try {
            const cats = await Categorys.find();
            res.status(200).json({ message: 'Categoría eliminada exitosamente', result: cats});
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el usuario: ' + error.message });
        }
    }
}

export default new CategoryController();