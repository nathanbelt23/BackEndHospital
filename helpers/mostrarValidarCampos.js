const { response, request } = require("express");
const { validationResult } = require("express-validator");

module.exports.ValidarCampos = (req = request, res = response, next) => {
    const errores = validationResult(req);


    if (!errores.isEmpty()) {
        res.status(401).json({
            ok: false,
            msg: errores.mapped(),
        });

    }
    next();

};