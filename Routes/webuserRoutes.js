const router = require('express').Router();
const upload = require('../Middleware/upload');
const { userRegister, userLogin,getProductById} = require('../Controller/webuserController');

router.post('/register', userRegister);
router.post('/login', userLogin);
 
router.get('/product/:id', getProductById);


module.exports = router;  