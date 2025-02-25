const mongoose = require('mongoose');

const DulceSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    descripcion: String
});

module.exports = mongoose.model('Dulce', DulceSchema);