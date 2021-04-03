const express = require('express');
const { check } = require('express-validator');
const routes = express.Router();
const busquedaController = require('../controller/busquedaController');
const { ValidarCampos } = require('../helpers/mostrarValidarCampos');
const { ValidarJWT } = require('../helpers/validar-jwt');
routes.get('/:busqueda', [
    check('busqueda', 'añade info a busqueda').not().isEmpty(),
    ValidarJWT,
    ValidarCampos
], busquedaController.ListadoTodo);


routes.get('/coleccion/:tabla/:busqueda', [
        check('busqueda', 'Agrega el criterio de busqueda').not().isEmpty(),
        ValidarJWT,
        ValidarCampos
    ],
    busquedaController.ListadoColleccion
    ///  ListadoTodo
);


module.exports = routes;