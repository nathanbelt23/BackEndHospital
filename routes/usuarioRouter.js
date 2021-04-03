const express = require('express');
const { check, checkSchema } = require('express-validator');
const routes = express.Router();
const usuarioController = require('../controller/usuarioController');
const { ValidarCampos } = require('../helpers/mostrarValidarCampos')
const valJWT = require('../helpers/validar-jwt');
routes.get('/', [
        check('desde', 'Es necesario es limite inferior').not().isEmpty(),
        check('desde', 'debe ser mayor  a cero').notEmpty().isInt({ min: 0 }),
        valJWT.ValidarJWT,
        ValidarCampos

    ],
    usuarioController.getUsuarios);


routes.post('/', [
    check("nombre", 'Digita el nombre').not().isEmpty(),
    check("password", 'Digita el password').not().isEmpty(),
    check("email", 'Digita el email').not().not().isEmpty(),
    ValidarCampos
], usuarioController.crearUsuario);

routes.put('/:id', [
    check("nombre", 'Digita el nombre').not().isEmpty(),
    check("email", 'Digita el email').not().not().isEmpty(),
    ValidarCampos

], usuarioController.actualizarUsuario);

routes.delete('/:id', usuarioController.borrarUsuario);


module.exports = routes;