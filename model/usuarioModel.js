const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.method('toJSON', function() {
    const { _v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('usuario', usuarioSchema);