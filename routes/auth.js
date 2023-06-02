const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { createUser, logUser, reToken, getAllUsers, deleteUser, updateUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/new',
    [
        //middlewares
        check('name', 'Tha name is required').not().isEmpty(), validateFields
    ],
    createUser)
router.post('/', logUser)
router.get('/renew', validateJWT, reToken)
router.get('/getUsers', getAllUsers)
router.post('/deleteUser', deleteUser)
router.post('/updateUser', updateUser)

module.exports = router; 