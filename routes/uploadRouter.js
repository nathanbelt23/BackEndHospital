const express = require("express");
const routes = express.Router();
const expressFileUpload = require("express-fileupload");
const uploadCon = require("../controller/uploadController");
const { ValidarCampos } = require("../helpers/mostrarValidarCampos");
const { ValidarJWT } = require("../helpers/validar-jwt");

// default options
routes.use(expressFileUpload());
routes.put("/:id/:tabla", [ValidarJWT, ValidarCampos], uploadCon.subirArchivos);
routes.get("/:id/:tabla", [ValidarJWT, ValidarCampos], uploadCon.retornarImagen);
module.exports = routes;