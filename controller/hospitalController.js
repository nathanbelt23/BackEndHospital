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

module.exports.ActualizarHospital = async(req = request, res = response) => {

    try {

        let id = req.params.id;
        let uid = req.uid;
        var hospital = await hospitalModel.findById(id);
        var { nombre } = req.body;

        if (!hospital) {
            res.status(401).json({
                ok: false,
                msg: "El hospital no existe",
            });
            process.exit(1);
        }


        hospital.nombre = nombre;
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }


        let hospitalActualizado = await hospitalModel.findByIdAndUpdate(id, cambiosHospital, { new: true });
        res.json({
            ok: true,
            msg: "El hospital fue actualizado",
            hospital: hospitalActualizado
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

module.exports.BorrarHospital = async(req = request, res = response) => {

    try {

        let id = req.params.id;
        var hospital = await hospitalModel.findById(id);




        if (!hospital) {
            res.status(401).json({
                ok: false,
                msg: "El hospital no existe",
            });
            process.exit(1);
        }

        console.warn('BorrarHospital 114');
        console.warn(hospital);
        await hospitalModel.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "El hospital fue eliminado",

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