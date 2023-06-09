const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Cuentas = require('../models/Cuentas');
const { generateJWT } = require('../helpers/JWT');
const Movimientos = require('../models/Movimientos');
const Usuario = require('../models/Usuario');
const Logs = require('../models/Logs');
const moment = require('moment/moment');

const createAccount = async (req, res = response) => {
    const { name, client, respons_oper, cons_equ } = req.body;
    try {
        let cuenta = await Cuentas.findOne({ name });
        if (cuenta) {
            return res.status(400).json({
                ok: false,
                msg: 'Una cuenta ya tiene ese nombre'
            });
        }
        cuenta = new Cuentas(req.body);
        await cuenta.save();

        // Registrar la acción en el log
        const log = new Logs({
            action: 'Nueva cuenta creada',
            descr: client,
            userId: cuenta._id
        });
        await log.save();

        // Respuesta
        res.status(201).json({
            ok: true,
            uid: cuenta.id,
            name: cuenta.name,
            client,
            respons_oper,
            cons_equ
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        });
    }
};

const getAllAcounts = async (req, res) => {
    try {
        const cuentas = await Cuentas.find({});
        res.json({
            ok: true,
            cuentas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        });
    }
};

const deleteAccount = async (req, res) => {
    const { accountId } = req.body;
    try {
        // Buscar y eliminar cuenta
        const cuenta = await Cuentas.findByIdAndDelete(accountId);
        if (!cuenta) {
            return res.status(404).json({
                ok: false,
                msg: 'Cuenta no encontrada'
            });
        }

        const log = new Logs({
            action: 'delete',
            descr: `Se eliminó la cuenta ${accountId}`,
            userId: accountId
        });
        await log.save();

        // Respuesta
        res.json({
            ok: true,
            msg: 'Cuenta eliminada correctamente'
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
                msg: 'Cuenta no encontrada'
            });
        }

        // Registrar la acción en el log
        const log = new Logs({
            action: 'update',
            descr: client,
            userId: accountId
        });
        await log.save();

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

const addMovement = async (req, res = response) => {
    const { userId, startDate, endDate, description } = req.body;
    try {
        // Buscar el usuario por ID
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Formatear las fechas utilizando moment.js
        const formattedStartDate = moment(startDate, 'DD-MM-YYYY').toDate();
        const formattedEndDate = moment(endDate, 'DD-MM-YYYY').toDate();

        // Crear el nuevo movimiento
        const movimiento = new Movimientos({
            userId,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            description
        });

        // Agregar el movimiento al usuario
        usuario.movements.push(movimiento);
        await usuario.save();
        // Guardar el movimiento
        await movimiento.save();

        // Respuesta
        res.status(201).json({
            ok: true,
            movimiento
        });
        // Registrar la acción en el log
        const log = new Logs({
            action: 'new',
            descr: description,
            userId: userId
        });
        await log.save();

        // Respuesta
        res.status(201).json({
            ok: true,
            movimiento
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        });
    }
};

const getAllLogs = async (req, res) => {
    try {
        const logs = await Logs.find({});
        res.json({
            ok: true,
            logs
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
    updateAccount,
    addMovement,
    getAllLogs
};