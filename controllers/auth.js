const { response } = require('express')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
//TO DO: validations like min and max chars
const Usuario = require('../models/Usuario')
const { generateJWT } = require('../helpers/JWT')
const createUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya tiene ese correo'
            })
        }
        usuario = new Usuario(req.body)
        //encrypt password
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()
        //JWT
        const token = await generateJWT(usuario.id, usuario.name)

        //response
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        })
    }

    //destructure body
    // const { name, email, password } = req.body


}
const logUser = async (req, res = response) => {
    //destructure body
    const { email, password } = req.body
    try {
        //validar user
        let usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }
        //validar password
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }

        //JWT for user
        const token = await generateJWT(usuario.id, usuario.name)
        //
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuníquese con TI'
        })
    }

}
const reToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name)
    //response  
    res.json({
        ok: true,
        uid,
        name,
        msg: 'Renew'
    })
}

const getAllUsers = async (req, res) => {
    try {
      const users = await Usuario.find({})
      res.json({
        ok: true,
        users
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Por favor comuníquese con TI'
      })
    }
  }

module.exports = {
    createUser,
    logUser,
    reToken,
    getAllUsers
}