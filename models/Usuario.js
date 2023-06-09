const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name: {
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
    user_type: {
        type: String,
        require: true
    },
    // otros campos del esquema
    movements: [{
        type: Schema.Types.ObjectId,
        ref: 'Movimientos'
    }]
})
module.exports = model('Usuario', UsuarioSchema);