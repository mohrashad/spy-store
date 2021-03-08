const router = require('express').Router();
const { check } = require('express-validator');
const bodyParser = require('body-parser');
const multer = require('multer');
const adminControl = require('../controllers/admin.control');
const adminGuard = require('./guards/admin.guard');

router.get('/add', adminGuard, adminControl.getAdd);
router.post(
    '/add', 
    adminGuard, 
    
    multer({
        storage: multer.diskStorage({
            destination: (req, res, cb) => cb(null, 'images'),
            filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
        })
    }).single('image'),

    check('image').custom((value, {req}) => {
        if (req.file) return true
        else throw 'image is requierd'
    }), adminControl.postAdd
);

router.get('/orders', adminGuard, adminControl.getOrders);
router.post(
    '/orders',
    adminGuard,
    bodyParser.urlencoded({extended: true}),
    adminControl.postOrders
);

router.post(
    '/order/status',
    adminGuard,
    bodyParser.urlencoded({extended: true}),
    adminControl.changeStatus
)

module.exports = router;