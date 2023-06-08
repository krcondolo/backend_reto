const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();
//express server
const app = express();
//database
dbConnection()
//CORS  
app.use(cors())
//public dir
app.use(express.static('public'))
//parse body postman
app.use(express.json())

// auth routes
app.use('/api/auth', require('./routes/auth'));
// accounts routes
app.use('/api/accounts', require('./routes/accounts'));
//requests
app.listen(process.env.PORT, () => {
    console.log(`Group MIND server is running on port ${process.env.PORT}`)
})
