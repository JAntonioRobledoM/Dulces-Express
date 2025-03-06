const express = require('express');
const router = express.Router();
const Dulce = require('../models/dulce');

// Mostrar todos los Dulces con paginación
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página actual
        const limit = 5; // Número de dulces por página
        const skip = (page - 1) * limit; // Calcular el número de dulces a omitir

        const dulces = await Dulce.find().skip(skip).limit(limit);
        const totalDulces = await Dulce.countDocuments();

        res.render('dulce/list', { 
            dulces, 
            currentPage: page, 
            totalPages: Math.ceil(totalDulces / limit) // Calcular total de páginas
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

// Crear un Dulce con manejo de imágenes
router.post('/', async (req, res) => {
    try {
        const { nombre, tipo, descripcion, imagenes } = req.body;
        const imagenesArray = imagenes ? imagenes.split(',').map(url => url.trim()) : [];

        await Dulce.create({ nombre, tipo, descripcion, imagenes: imagenesArray });
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

// Actualizar Dulce con manejo de imágenes
router.put('/:id', async (req, res) => {
    try {
        const { nombre, tipo, descripcion, imagenes } = req.body;
        const imagenesArray = imagenes ? imagenes.split(',').map(url => url.trim()) : [];

        await Dulce.findByIdAndUpdate(req.params.id, { nombre, tipo, descripcion, imagenes: imagenesArray });
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
        res.redirect('/dulce');
    } catch (error) {
        console.error("Error al eliminar el dulce:", error);
        res.status(500).send("Error al eliminar el dulce");
    }
});

module.exports = router;
