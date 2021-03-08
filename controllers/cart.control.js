const cartModel = require('../models/cart.model');
const { validationResult } = require('express-validator');

exports.getCart = async (req, res, next) => {
    try {
       const items = await cartModel.getItemsByUser(req.session.userId);
       res.render('cart', {items, isUser: true, isAdmin: req.session.isAdmin});
    }catch (err) {
       next(err);
    }
};

exports.postCart = async(req, res, next) => {
    const productData = {
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        userId: req.session.userId,
        productId: req.body.productId,
        timeStamp: Date.now()
    }

    if (validationResult(req).isEmpty()) {
        try {
            await cartModel.addNewItem(productData);
            res.redirect('/cart');
        }catch(err) {
            next(err);
        }
    } else {
        req.flash('amountError', validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};

exports.postSave = async (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        try {
            const newData = {amount: req.body.amount}
            console.log(req.body.cartId)
            await cartModel.editItem(req.body.cartId, newData);
            res.redirect('/cart');
        } catch(err) {
            next(err);
        }
    } else {
        req.flash('amountError', validationResult(req).array());
        res.redirect('/cart');
    }
};

exports.postDelete = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length) {
            await cartModel.deleteItem(req.body.cartId);
            res.redirect('/cart');
        } else {
            await cartModel.deleteAll(req.session.userId);
            res.redirect('/cart');
        }
    }catch(err) {
        next(err);
    }
};