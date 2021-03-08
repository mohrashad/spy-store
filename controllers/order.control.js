const orderModel = require('../models/order.model');
const cartModel = require('../models/cart.model');
const moment  = require('moment');

exports.postOrder = async(req, res) => {
    const orderData = await cartModel.getCartItemById(req.query.cart);
    res.render('verifyOrder', {orderData, isUser: true, isAdmin: req.session.isAdmin});
};

exports.getOrders = async(req, res, next) => {
    try {
        const orders = await orderModel.getOrdersByUser(req.session.userId);
        const ordersClone = orders.map(order => Object.assign({}, order));
        const OrdersTimestamp = ordersClone.map(order => moment(order._doc.timeStamp).fromNow());

        res.render('orders', {
           orders, isUser: true, 
           isAdmin: req.session.isAdmin,
           OrdersTimestamp
        });
        
    }catch (err) {
       next(err);
    }
};

exports.postOrders = async(req, res, next) => {
    const orderData = {
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        userId: req.session.userId,
        adress: req.body.adress,
        status: 'pinding',
        timeStamp: Date.now()
    }

    try {
        if (Object.keys(req.body).length == 0) await orderModel.deleteAllOrders(req.session.userId);
        else if (Object.keys(req.body).length == 1)await orderModel.deleteOrder(req.body.id);
        else await orderModel.addNewOrder(orderData);
        res.redirect('/orders');
    } catch (err) {
        next(err);
    }
};