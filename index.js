const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const connectDB = require('./database/config');
const respuestaModel = require('./model/respuestaModel');

app.use(cors());
connectDB();

app.listen(3000, () => {
    console.log('Server  running');
});

app.get('/', (req, res) => {
    respuestaModel.ok = true;
    respuestaModel.msg = "Excelente " + process.env.DATABASE;
    res.json(respuestaModel);

});