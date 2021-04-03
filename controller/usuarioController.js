const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const usuarioModel = require("../model/usuarioModel");

module.exports.crearUsuario = async(req = request, res = response) => {
    try {
        const { nombre, email, password } = req.body;
        const usuarioEmail = await usuarioModel.findOne({ email });
        if (usuarioEmail) {
            res.json({
                ok: false,
                msg: "ya existe usuario con ese email",
            });
            return;
        }
        let usuario = new usuarioModel(req.body);
        var salto = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salto);
        await usuario.save();
        res.json({
            ok: true,
            msg: "Usuario Creado=>" + nombre,
            usuario: usuario
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
};


module.exports.actualizarUsuario = async(req = request, res = response) => {
    try {
        const { nombre, email } = req.body;
        const uid = req.params.id;
        const usuario = await usuarioModel.findById(uid);


        if (!usuario) {
            res.status(401).json({
                ok: false,
                msg: "Usuario no existe",
            });
            return;
        }
        if (usuario.email !== email) {
            console.error('validacion email');
            const usuarioEmail = await usuarioModel.findOne({ email });
            if (usuarioEmail) {
                res.json({
                    ok: false,
                    msg: "ya existe usuario con ese email",
                });
                return;
            }
        }



        let campos = req.body;
        delete campos.password;
        delete campos.google;


        var usuarioActualizado = await usuarioModel.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: "Usuario actualizado=>" + nombre,
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
};

module.exports.getUsuarios = async(req = request, res = response) => {
    try {
        var listUsuarios = await usuarioModel.find({}, "nombre email role google");
        res.json({
            ok: true,
            msg: "Listado de usuario",
            usuarios: listUsuarios
                /* ,
                            uid: req.uid,
                            amor: 'nancy' */
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
};


module.exports.borrarUsuario = async(req = request, res = response) => {
    try {
        const uid = req.params.id;
        const usuario = await usuarioModel.findById(uid);


        if (!usuario) {
            res.status(401).json({
                ok: false,
                msg: "Usuario no existe",
            });
            return;
        }
        await usuarioModel.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: "Usuario Borrado =>" + usuario.nombre,

        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
};