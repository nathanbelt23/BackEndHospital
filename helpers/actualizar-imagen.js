const usuarioModel = require("../model/usuarioModel");
const hospitalModel = require("../model/hospitalModel");
const medicoModel = require("../model/medicoModel");
const fs = require("fs");

module.exports.ActualizarImagen = async(tabla, id, nombre) => {
    let urlAntigua = "";
    switch (tabla) {
        case "usuario":
            var usuario = await usuarioModel.findById(id);
            if (!usuario) {
                return false;
            } else {
                urlAntigua = usuario.img;
                if (!urlAntigua) {
                    borrarArchivo(urlAntigua, tabla);
                }
                usuario.img = nombre;
                await usuario.save();
                return true;
            }

            break;
        case "hospitales":
            var hospital = await hospitalModel.findById(id);
            if (!hospital) {
                return false;
            } else {
                urlAntigua = usuario.img;
                if (!urlAntigua) {
                    borrarArchivo(urlAntigua, tabla);
                }
                hospital.img = nombre;
                await hospital.save();
                return true;
            }

            break;
        case "medicos":
            var medicos = await medicoModel.findById(id);
            if (!medicos) {
                return false;
            } else {
                urlAntigua = medicos.img;
                if (!urlAntigua) {
                    borrarArchivo(urlAntigua, tabla);
                }
                medicos.img = nombre;
                await medicos.save();
                return true;
            }

            break;

        default:
            return false;
            break;
    }
};

function borrarArchivo(urlAntigua, tabla) {
    const pathViejos = `./uploads/${tabla}/${urlAntigua}`;
    if (fs.existsSync(pathViejos)) {
        fs.unlinkSync(pathViejos);
    }
}