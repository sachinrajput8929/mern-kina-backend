const router = require('express').Router();
const { addBanner, getBanner, getBannerById, updateBanner,updateBannerStatus, deleteBanner } = require('../Controller/bannerController');
const upload = require('../Middleware/upload');

router.post('/add-banner', upload.single('image'), addBanner);
router.get('/get-banner', getBanner);
router.get('/get-by-banner/:id', getBannerById);
router.post('/update-banner/:id', upload.single('image'), updateBanner);
router.delete('/delete-banner/:id', deleteBanner);
router.post("/updateStatus", updateBannerStatus);
// router.put('/update-site', upload.single('logo'), updateSite);


module.exports = router;  