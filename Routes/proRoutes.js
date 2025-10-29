const router = require('express').Router();
const upload = require('../Middleware/upload');
const { addProduct, getProduct, getProbyId, getProbyIdUpdate,updateProductStatus, proDelete } = require('../Controller/proController');

router.post('/addProduct', upload.single('image'), addProduct);
router.get('/getProduct', getProduct);
router.post('/getProbyId', getProbyId);
router.post('/getProbyIdUpdate', getProbyIdUpdate);
router.post("/updateStatus", updateProductStatus);
router.delete('/deleteProduct/:proid', proDelete);


module.exports = router;  