const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Dulce = require('../models/dulce');

// Configuración de almacenamiento de imágenes con multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único con fecha
    }
});

const upload = multer({ storage: storage });

// Mostrar todos los Dulces con paginación
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const dulces = await Dulce.find().skip(skip).limit(limit);
        const totalDulces = await Dulce.countDocuments();

        res.render('dulce/list', {
            dulces,
            currentPage: page,
            totalPages: Math.ceil(totalDulces / limit)
        });
    } catch (error) {
        console.error("Error al obtener los dulces:", error);
        res.status(500).send("Error al cargar los dulces");
    }
});

// Mostrar el panel de admin con paginación
router.get('/admin', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const dulces = await Dulce.find().skip(skip).limit(limit);
        const totalDulces = await Dulce.countDocuments();

        res.render('dulce/admin_panel', {
            dulces,
            currentPage: page,
            totalPages: Math.ceil(totalDulces / limit)
        });
    } catch (error) {
        console.error("Error al obtener los dulces:", error);
        res.status(500).send("Error al cargar los dulces en el panel de admin");
    }
});

// Formulario para crear un Dulce
router.get('/new', (req, res) => {
    res.render('dulce/new');
});

// Crear un Dulce con subida de imagen
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, tipo, descripcion } = req.body;
        const imagen = req.file ? req.file.filename : null;

        await Dulce.create({ nombre, tipo, descripcion, imagen });
        res.redirect('/dulce');
    } catch (error) {
        console.error("Error al crear el dulce:", error);
        res.status(500).send("Error al agregar el dulce");
    }
});

// Formulario para editar un Dulce
router.get('/:id/edit', async (req, res) => {
    try {
        const dulce = await Dulce.findById(req.params.id);
        res.render('dulce/edit', { dulce });
    } catch (error) {
        console.error("Error al obtener el dulce para editar:", error);
        res.status(500).send("Error al cargar la edición del dulce");
    }
});

// Actualizar Dulce con nueva imagen si se sube una
router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, tipo, descripcion } = req.body;
        const dulce = await Dulce.findById(req.params.id);

        let imagen = dulce.imagen; // Mantener la imagen existente si no se sube una nueva
        if (req.file) {
            imagen = req.file.filename;
        }

        await Dulce.findByIdAndUpdate(req.params.id, { nombre, tipo, descripcion, imagen });
        res.redirect('/dulce');
    } catch (error) {
        console.error("Error al actualizar el dulce:", error);
        res.status(500).send("Error al actualizar el dulce");
    }
});

// Eliminar Dulce
router.delete('/:id', async (req, res) => {
    try {
        await Dulce.findByIdAndDelete(req.params.id);
        res.redirect('/dulce/admin');
    } catch (error) {
        console.error("Error al eliminar el dulce:", error);
        res.status(500).send("Error al eliminar el dulce");
    }
});

module.exports = router;
