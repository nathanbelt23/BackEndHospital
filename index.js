const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('./database/config');
const respuestaModel = require('./model/respuestaModel');

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server  running');
});



connectDB();
app.use('/api/login', require('./routes/authRouter'));
app.use('/api/hospitales', require('./routes/hospital.router'));
app.use('/api/usuarios', require('./routes/usuarioRouter'));
app.use('/api/medicos', require('./routes/medicoRouter'));
app.use('/api/todo', require('./routes/busquedaRouter'));
app.use('/api/upload', require('./routes/uploadRouter'));

app.get('/', (req, res) => {
    respuestaModel.ok = true;
    respuestaModel.msg = "Excelente ";
    res.json(respuestaModel);

});