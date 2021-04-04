const express = require("express");
const { check } = require("express-validator");
const routes = express.Router();
const autCon = require("../controller/authController");
const { ValidarCampos } = require("../helpers/mostrarValidarCampos");
routes.post(
    "/", [
        check("email", "Por favor digita el email").not().isEmpty(),
        check("email", "Por favor digita un email valido").isEmail(),
        check("password", "Por favor digita el password").not().isEmpty(),
        ValidarCampos,
    ],
    autCon.login
);

routes.post(
    "/google", [
        check("token", "Por favor digita el email").not().isEmpty(),
        ValidarCampos,
    ],
    autCon.googleSingIn
);

module.exports = routes;