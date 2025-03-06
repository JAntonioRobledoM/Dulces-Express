const mongoose = require('mongoose');

const DulceSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagenes: [{ type: String, required: true }] 
});

module.exports = mongoose.model('Dulce', DulceSchema);
