const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log(process.env.DB_URL_CON)
        await mongoose.connect(process.env.DB_URL_CON,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Db is on')

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la bd')
    }

}

module.exports={
    dbConnection
}