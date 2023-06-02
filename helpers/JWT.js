const jwt = require('jsonwebtoken')

const generateJWT = (uid, name, user_type) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name, user_type }
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT')
            }
            resolve(token)
        })
    })
}

module.exports = {
    generateJWT
}