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
            .populate('hospital', 'nombre');

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