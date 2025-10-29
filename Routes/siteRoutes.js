const router = require('express').Router();
const { addSite, updateSite, getSite } = require('../Controller/siteController');
const upload = require('../Middleware/upload');

router.post('/addSite', addSite);
router.get('/get-site', getSite);
router.put('/update-site', upload.single('logo'), updateSite);


module.exports = router;  