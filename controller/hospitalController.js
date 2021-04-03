const { request, response } = require("express");
const hospitalModel = require("../model/hospitalModel");
const usuarioModel = require("../model/usuarioModel");

module.exports.crearHospital = async(req = request, res = response) => {
    try {

        var hospital = new hospitalModel(req.body);
        hospital.usuario = req.uid;
        await hospital.save();

        res.json({
            ok: true,
            msg: "Hospital creado ",
            hospital: hospital
        });
    } catch (error) {
        console.error(error);

        res.status(401).json({
            ok: false,
            msg: "Hospital NO creado",
        });
        process.exit(1);
    }
};


module.exports.ListadoTodosHospital = async(req = request, res = response) => {
    try {
        var hospitales = await hospitalModel.find().
        populate('usuario', 'nombre email');

        res.json({
            ok: false,
            msg: "listado de hospital",
            hospitales: hospitales
        });


    } catch (error) {
        console.error(error);

        res.status(401).json({
            ok: false,
            msg: "Llama al administrador",
        });
        process.exit(1);
    }


}