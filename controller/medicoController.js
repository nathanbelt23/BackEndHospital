const { request, response } = require("express");
const medicoModel = require("../model/medicoModel");

module.exports.crearMedico = async(req = request, res = response) => {
    try {

        let medico = new medicoModel(req.body);
        medico.usuario = req.uid;
        await medico.save();

        res.json({
            ok: true,
            msg: "medico creado",
            medico
        });
    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            msg: "Llama al administrador"
        });
    }
};

module.exports.ListadoMedicos = async(req = request, res = response) => {
    try {
        var medicos = await medicoModel.find()
            .populate('usuario', 'nombre email')
            .populate('medico', 'nombre');

        res.json({
            ok: true,
            msg: "medico creado",
            medicos
        });
    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            msg: "Llama al administrador"
        });
    }
}

module.exports.ActualizarMedico = async(req = request, res = response) => {

    try {

        let id = req.params.id;
        let uid = req.uid;
        var medico = await medicoModel.findById(id);
        var { nombre, Medico } = req.body;

        if (!medico) {
            res.status(401).json({
                ok: false,
                msg: "El medico no existe",
            });
            process.exit(1);
        }


        medico.nombre = nombre;
        medico.Medico = Medico;
        const cambiosmedico = {
            ...req.body,
            usuario: uid
        }


        let medicoActualizado = await medicoModel.findByIdAndUpdate(id, cambiosmedico, { new: true });
        res.json({
            ok: true,
            msg: "El medico fue actualizado",
            medico: medicoActualizado
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



module.exports.BorrarMedico = async(req = request, res = response) => {

    try {

        let id = req.params.id;
        var Medico = await medicoModel.findById(id);




        if (!Medico) {
            res.status(401).json({
                ok: false,
                msg: "El Medico no existe",
            });
            process.exit(1);
        }

        console.warn('BorrarMedico 114');
        console.warn(Medico);
        await medicoModel.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "El Medico fue eliminado",

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