const router = require('express').Router();
const productControl = require('../controllers/product.control');
const authGuard = require('./guards/auth.guard');

router.get('/', authGuard.isAuth, productControl.getfirstProduct)

router.get('/:id', authGuard.isAuth, productControl.getProductDetails);

module.exports = router;