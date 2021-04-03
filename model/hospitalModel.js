const { model, Schema } = require('mongoose');
const hospitalSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
}, { collection: 'hospitales' });
hospitalSchema.method('toJSON',
    function() {
        const { _v, ...object } = this.toObject();
        return object;
    }
);
module.exports = model('hospital', hospitalSchema);