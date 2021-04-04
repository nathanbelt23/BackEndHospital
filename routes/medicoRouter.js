const express = require("express");
const { check } = require("express-validator");
const routes = express.Router();
const medicoController = require("../controller/medicoController");
const { ValidarCampos } = require("../helpers/mostrarValidarCampos");
const { ValidarJWT } = require("../helpers/validar-jwt");
routes.post(
    "/", [
        check("nombre", "nombre es obligatorio").not().isEmpty(),
        check("hospital", "hospital es obligatorio").not().isEmpty(),
        check("hospital", "hospital no tiene un id valido").isMongoId(),
        ValidarJWT,
        ValidarCampos
    ],

    medicoController.crearMedico
);

routes.put(
    "/:id", [
        check("nombre", "nombre es obligatorio").not().isEmpty(),
        check("hospital", "hospital es obligatorio").not().isEmpty(),
        check("hospital", "hospital no tiene un id valido").isMongoId(),
        ValidarJWT,
        ValidarCampos
    ],

    medicoController.ActualizarMedico

);

routes.delete(
    "/:id", [
        ValidarJWT,
        ValidarCampos,
    ],

    medicoController.BorrarMedico

);


routes.get("/", [ValidarJWT, ValidarCampos], medicoController.ListadoMedicos);
module.exports = routes;