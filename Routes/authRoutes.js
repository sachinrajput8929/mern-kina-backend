const router = require('express').Router();
const { authRegister, authLogin, getUser,deleteUser } = require('../Controller/authController');
const { sigupValidation } = require('../Middleware/authValidation');


router.post('/register', sigupValidation, authRegister)
router.get('/getuser', getUser)
router.post('/login', authLogin)
router.delete('/delete-user/:id', deleteUser);
module.exports = router;    
