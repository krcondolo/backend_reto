const { response } = require('express')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
//TO DO: validations like min and max chars
const Cuentas = require('../models/Cuentas')
const { generateJWT } = require('../helpers/JWT')
const createAccount = async (req, res = response) => {
    const { name, client, respons_oper, cons_equ } = req.body
    try {
        let cuenta = await Cuentas.findOne({ name })
        if (cuenta) {
            return res.status(400).json({
                ok: false,
                msg: 'Una cuenta ya tiene ese nombre'
            })
        }
        cuenta = new Cuentas(req.body)
        await cuenta.save()
        //response
        res.status(201).json({
            ok: true,
            uid: cuenta.id,
            name: cuenta.name,
            client,
            respons_oper,
            cons_equ
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        })
    }
}

const getAllAcounts = async (req, res) => {
    try {
        const cuentas = await Cuentas.find({})
        res.json({
            ok: true,
            cuentas
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        })
    }
}

const deleteAccount = async (req, res) => {
    const { accountId } = req.body;
    try {
        // Buscar y eliminar cuenta
        const cuenta = await Cuentas.findByIdAndDelete(accountId);
        if (!cuenta) {
            return res.status(404).json({
                ok: false,
                msg: 'cuenta no encontrada'
            });
        }
        // Respuesta
        res.json({
            ok: true,
            msg: 'cuenta eliminada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        });
    }
};

const updateAccount = async (req, res) => {
    const { accountId, name, client, respons_oper, cons_equ } = req.body;
    try {
        // Buscar cuenta y actualizar datos
        let cuenta = await Cuentas.findByIdAndUpdate(
            accountId,
            { name, client, respons_oper, cons_equ },
            { new: true }
        );
        if (!cuenta) {
            return res.status(404).json({
                ok: false,
                msg: 'cuenta no encontrada'
            });
        }
        // Respuesta
        res.json({
            ok: true,
            cuenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        });
    }
};
module.exports = {
    createAccount,
    getAllAcounts,
    deleteAccount,
    updateAccount
}