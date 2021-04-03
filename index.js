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

app.use('/api/usuarios/', require('./routes/usuarioRouter'));
app.use('/api/login', require('./routes/authRouter'));

app.get('/', (req, res) => {
    respuestaModel.ok = true;
    respuestaModel.msg = "Excelente ";
    res.json(respuestaModel);

});