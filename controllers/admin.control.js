const { validationResult } = require('express-validator');
const moment = require('moment');
const productModel = require('../models/products.model');
const orderModel = require('../models/order.model');
const authModel = require('../models/auth.model');

exports.getAdd = (req, res, next) => {
    res.render('addProduct', {
        addProductMsg: req.flash('databaseMsg'),
        errors: req.flash('addProductErrors'),
        isUser: true,
        isAdmin: true
    });
}

exports.postAdd = async(req, res, next) => {
    if (validationResult(req).isEmpty() ) {
        const productData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename
        }
        try {
            const product = await productModel.addProduct(productData);
            req.flash('databaseMsg', product);
            res.redirect('/admin/add');
        }catch(err) {
            next(err);
        }
    } else {
        req.flash('addProductErrors', validationResult(req).array());
        res.redirect('/admin/add');
    }
}

const getUserEmails = async (req, res) => {
    const users = await authModel.getEmails();
    return users;
}

exports.getOrders = async (req, res, next) => {
    try {
        let orders;
        const users = await getUserEmails();
        const statusFilters = ['all', 'pending', 'sent', 'compeleted'];
        const status = req.query.status;

        if (status && statusFilters.includes(status) && status !== 'all') {
            orders = await orderModel.filterOrdersByStatus(status);
        } else {
            orders = await orderModel.getAllOrders();
        }

        const ordersClone = orders.map(order => Object.assign({}, order));
        const OrdersTimestamp = ordersClone.map(order => moment(order._doc.timeStamp).fromNow());
        res.render('manageOrders', {orders, users, OrdersTimestamp, isUser: true, isAdmin: true});
    } catch(err) {
        next(err);
    }
}

exports.postOrders = async (req, res, next) => {
    try {
        const users = await getUserEmails();
        const userId = users.find(user => user.email === req.body.email)._id;
        const orders = await orderModel.getOrdersByUser(userId);
        const ordersClone = orders.map(order => Object.assign({}, order));
        const OrdersTimestamp = ordersClone.map(order => moment(order._doc.timeStamp).fromNow());
        res.render('manageOrders', {orders, OrdersTimestamp, users, isUser: true, isAdmin: true});
    } catch (err) {
        next(err);
    }
};

exports.changeStatus = async(req, res, next) => {
    try {
        await orderModel.updateOrderStatus(req.body);
        res.redirect('/admin/orders');
    } catch(err) {
        next(err);
    }
}