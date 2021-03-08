const mongoose = require('mongoose');
const schemas = require('../schemas');

// carts model code
const orderItem = mongoose.model('order', schemas.orderSchema);

exports.addNewOrder = async data => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await new orderItem(data).save();
        mongoose.disconnect();
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
};

exports.getOrdersByUser = async userId => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        const items = await orderItem.find({userId}, {}, {sort: {timeStamp: 1}});
        mongoose.disconnect();
        return items;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.deleteOrder = async id => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await orderItem.findByIdAndDelete(id);
        mongoose.disconnect();
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.deleteAllOrders = async userId => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await orderItem.deleteMany({userId}, {});
        mongoose.disconnect();
        console.log('all oredrs have been deleted');
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.getAllOrders = async() => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        const allOrders = await orderItem.find({}, {},  {sort: {timeStamp: 1}});
        mongoose.disconnect();
        return allOrders;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.updateOrderStatus = async ({ orderId, status }) => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        await orderItem.findByIdAndUpdate(orderId, {status},  {sort: {timeStamp: 1}});
        mongoose.disconnect();
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.filterOrdersByStatus = async (status) => {
    try {
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        const orders = await orderItem.find({status}, {},  {sort: {timeStamp: 1}});
        mongoose.disconnect();
        return orders;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}