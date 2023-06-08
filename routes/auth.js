const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { createUser, logUser, reToken, getAllUsers, deleteUser, updateUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('user_type', 'The user_type is required').not().isEmpty(),
        check('user_type', 'El tipo de usuario solo puede ser `admin` o `normal` ').custom((value) => {
            if (value !== 'admin' && value !== 'normal') {
                throw new Error('El tipo de usuario solo puede ser `admin` o `normal');
            }
            return true;
        }),
        check('email', 'The email is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ],
    createUser
);
router.post('/', logUser)
router.get('/renew', validateJWT, reToken)
router.get('/getUsers', getAllUsers)
router.post('/deleteUser', deleteUser)
router.post('/updateUser',
    [
        //middlewares
        check('name', 'Tha name is required').not().isEmpty(), validateFields,
        check('user_type', 'The user_type is required').not().isEmpty(), validateFields,
        check('user_type', 'El tipo de usuario solo puede ser `admin` o `normal` ').custom((value) => {
            if (value !== 'admin' && value !== 'normal') {
                throw new Error('El tipo de usuario solo puede ser `admin` o `normal');
            }
            return true;
        }),
        check('email', 'The email is required').not().isEmpty(), validateFields,
        check('password', 'The password is required').not().isEmpty(), validateFields,
    ],
    updateUser)

module.exports = router; 