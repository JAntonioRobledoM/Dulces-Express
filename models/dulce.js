const mongoose = require('mongoose');

const DulceSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: false } 
});

module.exports = mongoose.model('Dulce', DulceSchema);
