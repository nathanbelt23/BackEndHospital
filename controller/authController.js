const { request, response } = require('express');
const usuarioModel = require('../model/usuarioModel');
const bcrypt = require("bcryptjs");

const GenerarJWT = require('../helpers/jwt')

module.exports.login = async(req = request, res = response) => {

    try {
        const { email, password } = req.body;

        var usuarioDB = await usuarioModel.findOne({ email });

        if (!usuarioDB) {
            res.status(401).json({
                ok: false,
                msg: "No existe usuario",
            });

        }

        var compare = bcrypt.compareSync(password, usuarioDB.password);
        let token = "";

        await GenerarJWT.GenerarJWT(usuarioDB.id).then(p => {
            token = p;
        });


        if (compare) {
            res.json({
                ok: true,
                msg: "ok",
                comparacion: compare,
                token: token

            });
        } else {
            res.json({
                ok: false,
                msg: "Datos de ingreso no valido",
                comparacion: compare

            });
        }

    } catch (error) {
        console.warn(error);
        res.status(401).json({
            ok: false,
            msg: "Llama al administrador"
        });

    }

}