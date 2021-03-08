const mongoose = require('mongoose');
const schemas = require('../schemas');

// carts model code
const cartItem = mongoose.model('cart', schemas.cartSchema);

exports.addNewItem = async data => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        const { productId, userId } = data;
        const item = await cartItem.findOne({productId, userId});
        if (item) {
            const newAmount = item.amount + Number(data.amount);
            const newData = {amount: newAmount, timeStamp: data.timeStamp};
            await cartItem.updateOne({_id: item._id}, newData);
            mongoose.disconnect();
        } else {
            await new cartItem(data).save();
            mongoose.disconnect();
        }
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
};

exports.getItemsByUser = async userId => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        const items = await cartItem.find({userId}, {}, {sort: {timeStamp: 1}});
        mongoose.disconnect();
        return items;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.getCartItemById = async id => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        const cart = await cartItem.findById(id);
        mongoose.disconnect();
        return cart;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.editItem = async (id, newData) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await cartItem.updateOne({_id: id}, newData);
        mongoose.disconnect();
        console.log('item updated')
        // return item;
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.deleteItem = async (id) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await cartItem.findByIdAndDelete(id);
        console.log('item has been deleted')
        mongoose.disconnect();
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.deleteAll = async (userId) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await cartItem.deleteMany({userId});
        console.log('all items deleted')
        mongoose.disconnect();
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
}