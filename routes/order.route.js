const router = require('express').Router();
const authGuard = require('./guards/auth.guard');
const bodyParser = require('body-parser');
const orderControl = require('../controllers/order.control');

router.get('/', authGuard.isAuth, orderControl.getOrders);

router.post('/', authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    orderControl.postOrders
);


router.get('/verify', authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    orderControl.postOrder
);

module.exports = router;

// /orders/verify?order=${item._id}`