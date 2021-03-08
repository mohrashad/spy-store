const authModel = require('../models/auth.model');
const { validationResult } = require('express-validator')

exports.getSignup = (req, res) => {
    res.render('signup', {
        errorMsg: req.flash('signupError')[0],
        passErr: req.flash('passError')[0]
    });
}

exports.getLogin = ((req, res) => {
    res.render('login', {errorMsg: req.flash('loginError')[0]});
});

exports.postSignup = async (req, res) => {
    if (validationResult(req).isEmpty()) {
        try {
            await authModel.createNewUser(req.body);
            res.redirect('/login');
        } catch(err) {
            req.flash('signupError', err);
            res.redirect('/signup')
        }
    }else {
        console.log(validationResult(req).array())
        req.flash('passError', validationResult(req).array());
        res.redirect('/signup');
    }
}

exports.postLogin = async (req, res) => {
    try {
        const { id, isAdmin } = await authModel.logIn(req.body);
        req.session.userId = id;
        req.session.isAdmin = isAdmin;
        res.redirect('/');
    } catch(err) {
        req.flash('loginError', err);
        res.redirect('/login');
    }
}

exports.logout = (req, res) => {
   if (req.session) {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/');
        })
   }
}