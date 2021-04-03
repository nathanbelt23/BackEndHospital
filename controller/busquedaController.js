const { request, response } = require('express');

const usuarioModel = require('../model/usuarioModel');
const hospitaLModel = require('../model/hospitalModel');
const medicoModel = require('../model/medicoModel');

module.exports.ListadoTodo = async(req = request, res = response) => {
    try {
        const busqueda = req.params.busqueda;
        const regEx = RegExp(busqueda, 'i');
        const [listadoUsuarios, listadoHospitales, listadosMedicos] = await Promise.all(
            [
                usuarioModel.find({ nombre: regEx }),
                hospitaLModel.find({ nombre: regEx }),
                medicoModel.find({ nombre: regEx }),
            ]
        );
        res.json({
            ok: true,
            msg: "Listado de todo",
            listadoUsuarios,
            listadoHospitales,
            listadosMedicos
        });
    } catch (errror) {
        console.error(errror);
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
}


module.exports.ListadoColleccion = async(req = request, res = response) => {
    try {
        const busqueda = req.params.busqueda;
        const tabla = req.params.tabla;
        const regEx = RegExp(busqueda, 'i');
        let data;

        switch (tabla) {
            case 'usuarios':
                data = await usuarioModel.find({ nombre: regEx });
                break;
            case 'medicos':
                data = await medicoModel.find({ nombre: regEx });
                break;
            case 'hospitales':
                data = await hospitaLModel.find({ nombre: regEx });
                break;

            default:
                break;
        }

        res.json({
            ok: true,
            msg: "Listado por tabla " + tabla,
            data,
        });
    } catch (errror) {
        console.error(errror);
        res.status(400).json({
            ok: false,
            msg: "Comunicate con el admin",
        });
    }
}