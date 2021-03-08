const router = require('express').Router();
const bodyParser = require('body-parser');
const cartControl = require('../controllers/cart.control');
const { check } = require('express-validator');
const authGuard = require('./guards/auth.guard');

router.get('/', authGuard.isAuth, cartControl.getCart);

router.post('/', authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount').isInt({min: 1}).withMessage(process.env.AMOUNT_ERR_MSG),
    cartControl.postCart
);

router.post(
    '/save', 
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount').isInt({min: 1}).withMessage(process.env.AMOUNT_ERR_MSG),
    cartControl.postSave
);

router.post(
    '/delete',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    cartControl.postDelete
);

module.exports = router;