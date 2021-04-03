const { model, Schema } = require("mongoose");
const medicoSchema = new Schema({
    nombre: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuario",
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: "hospital",
    },
});

module.exports = new model("medico", medicoSchema);