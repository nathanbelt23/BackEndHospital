const mongoose = require('mongoose');
const path = require('path');
const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');
const { validaExisteArchivo } = require('../helpers/validacionArchivo');
const { ActualizarImagen } = require('../helpers/actualizar-imagen');
const usuarioModel = require('../model/usuarioModel');
const hospitaLModel = require('../model/hospitalModel');
const medicoModel = require('../model/medicoModel');

module.exports.subirArchivos = (req = request, res = response) => {
    {
        const files = req.files;
        const { tabla, id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                ok: false,
                msg: "ID no valido"
            });
        }

        const extensionesValidas = ['jpg', '.png', 'jpeg', 'gif'];
        let fileTipo;

        if (!validaExisteArchivo(files)) {
            return res.status(400).json({
                ok: false,
                msg: "No hay archivos para subir"
            });

        }
        let tiposTabla = ['medicos', 'hospitales', 'usuarios'];
        if (tiposTabla.includes(tabla) == false) {
            return res.status(400).json({
                ok: false,
                msg: "Tabla no  permitida"
            });
        }


        fileTipo = req.files.imagen;
        const extensionArchivo = fileTipo.name.split('.');
        const extension = extensionArchivo[extensionArchivo.length - 1];

        if (extensionesValidas.includes(extension) == false) {
            return res.status(400).json({
                ok: false,
                msg: "Extension no permitida"
            });
        }

        const nombreArchivo = `${ uuidv4() }.${extension}`;
        const pathfile = `./uploads/${ tabla }/${nombreArchivo}`;
        fileTipo.mv(pathfile, function(err) {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: `No se puede subir  ${fileTipo.name}`

                });
            }
            ActualizarImagen(tabla, id, nombreArchivo);
            res.json({
                ok: true,
                msg: `Archivo subido ${fileTipo.name}`,
                archivo: nombreArchivo

            });
        });

    }
}
module.exports.retornarImagen = async(req = request, res = response) => {
    try {
        const id = req.params.id;
        const tabla = req.params.tabla;
        let data;

        switch (tabla) {
            case 'usuarios':
                data = await usuarioModel.findById(id);
                break;
            case 'medicos':
                data = await medicoModel.findById(id);
                break;
            case 'hospitales':
                data = await hospitaLModel.findById(id);
                break;

            default:
                break;
        }

        if (data.img) {
            const pathsend = path.join(__dirname, `../uploads/${ tabla }/${data.img}`);
            console.error(pathsend);
            res.sendFile(pathsend);
        } else {
            const pathsendNoImagen = path.join(__dirname, `../uploads/noImage.png`);
            res.sendFile(pathsendNoImagen);
        }

    } catch (error) {
        console.error(error);
        res.status(401).json({
                ok: false,
                msg: "Comunicate con el administrador"

            }

        );

    }

}