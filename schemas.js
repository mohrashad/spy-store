const mongoose = require('mongoose');


exports.userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

exports.cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timeStamp: Number
});

exports.productSchema = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
});

exports.orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timeStamp: Number,
    adress: String,
    status: String
});