const router = require('express').Router();
const bodyParser = require('body-parser');
const authControl = require('../controllers/auth.control');
const authGuard = require('./guards/auth.guard');
const { check } = require('express-validator');

router.get('/signup', authGuard.isNotAuth, authControl.getSignup);
router.post(
    '/signup',
    authGuard.isNotAuth,
    bodyParser.urlencoded({extended: true}),
    check('password', process.env.PASSWORD_LENGTH_MSG).isLength({min: 6}),
    authControl.postSignup
);

router.get('/login', authGuard.isNotAuth, authControl.getLogin);
router.post(
    '/login',
    authGuard.isNotAuth,
    bodyParser.urlencoded({extended: true}),
    authControl.postLogin
);

router.all('/logout', authGuard.isAuth, authControl.logout);

module.exports = router;