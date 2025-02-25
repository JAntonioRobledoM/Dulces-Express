require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error(err));

// Configuración de Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Importar rutas
const dulcesRoutes = require('./router/dulce');
app.use('/dulce', dulcesRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
});