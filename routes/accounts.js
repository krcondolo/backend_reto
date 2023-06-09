const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');
const { createAccount, deleteAccount, getAllAcounts, updateAccount, addMovement } = require('../controllers/accounts');


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
        check('client', 'The client is required').not().isEmpty(), validateFields,
        check('respons_oper', 'The respons_oper is required').not().isEmpty(), validateFields,
        check('cons_equ', 'The cons_equ is required').not().isEmpty(), validateFields,
    ],
    updateAccount)

router.post('/addMovement',
    [
        //middlewares
        check('userId', 'The userId is required').not().isEmpty(),
        check('startDate', 'The startDate is required').not().isEmpty(),
        check('endDate', 'The endDate is required').not().isEmpty(),
        check('description', 'The description is required').not().isEmpty(),
        validateFields
    ],
    addMovement
);
module.exports = router; 