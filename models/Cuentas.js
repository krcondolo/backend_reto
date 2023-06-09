const { Schema, model } = require('mongoose')

const CuentasSchema = Schema({
    name: {
        type: String,
        require: true
    },
    client: {
        type: String,
        require: true
    },
    respons_oper: {
        type: String,
        require: true
    },
    cons_equ: {
        type: String,
        require: true
    },
})

module.exports = model('Cuentas', CuentasSchema)