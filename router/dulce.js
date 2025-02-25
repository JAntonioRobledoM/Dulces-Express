const express = require('express');
const router = express.Router();
const Dulce = require('../models/dulce');

// Mostrar todos los Dulces
router.get('/', async (req, res) => {
    const dulces = await Dulce.find();
    res.render('dulce/list', { dulces });
});

// Mostrar el panel de admin
router.get('/admin', async (req, res) => {
    const dulces = await Dulce.find();
    res.render('dulce/admin_panel', { dulces });
});

// Formulario para crear un Dulce
router.get('/new', (req, res) => {
    res.render('dulce/new');
});

// Crear un Dulce
router.post('/', async (req, res) => {
    await Dulce.create(req.body);
    res.redirect('/dulce');
});

// Formulario para editar un Dulce
router.get('/:id/edit', async (req, res) => {
    const dulce = await Dulce.findById(req.params.id);
    res.render('dulce/edit', { dulce });
});

// Actualizar Dulce
router.put('/:id', async (req, res) => {
    await Dulce.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/dulce');
});

// Eliminar Dulce
router.delete('/:id', async (req, res) => {
    await Dulce.findByIdAndDelete(req.params.id);
    res.redirect('/dulce');
});

module.exports = router;