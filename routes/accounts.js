const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { createAccount, deleteAccount, getAllAcounts, updateAccount } = require('../controllers/accounts');


router.post('/newAcc',
    [
        //middlewares
        check('name', 'Tha name is required').not().isEmpty(), validateFields,
        check('client', 'The user_type is required').not().isEmpty(), validateFields,
        check('respons_oper', 'The email is required').not().isEmpty(), validateFields,
        check('cons_equ', 'The password is required').not().isEmpty(), validateFields,
    ],
    createAccount)


router.post('/newAcc',
    [
        //middlewares
        check('name', 'Tha name is required').not().isEmpty(), validateFields,
        check('client', 'The user_type is required').not().isEmpty(), validateFields,
        check('respons_oper', 'The email is required').not().isEmpty(), validateFields,
        check('cons_equ', 'The password is required').not().isEmpty(), validateFields,
    ],
    createAccount)
router.post('/deleteAcc', deleteAccount)
router.post('/getAcc', getAllAcounts)
router.post('/updAcc',
    [
        //middlewares
        check('name', 'Tha name is required').not().isEmpty(), validateFields,
        check('client', 'The user_type is required').not().isEmpty(), validateFields,
        check('respons_oper', 'The email is required').not().isEmpty(), validateFields,
        check('cons_equ', 'The password is required').not().isEmpty(), validateFields,
    ],
    updateAccount)
module.exports = router; 