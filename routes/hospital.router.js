const express = require('express');
const { check } = require('express-validator');
const { ValidarCampos } = require('../helpers/mostrarValidarCampos')
const hospitalController = require('../controller/hospitalController');
const { ValidarJWT } = require('../helpers/validar-jwt');


const routes = express.Router();
routes.post('/', [
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    ValidarJWT,
    ValidarCampos
], hospitalController.crearHospital);

routes.get('/', [
    ValidarJWT,
    ValidarCampos
], hospitalController.ListadoTodosHospital);

routes.put('/:id', [
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    ValidarJWT,
    ValidarCampos
], hospitalController.ActualizarHospital);


routes.delete('/:id', [
    ValidarJWT,
    ValidarCampos
], hospitalController.BorrarHospital);
module.exports = routes;