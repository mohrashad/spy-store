const mongoose = require('mongoose');
const schemas = require('../schemas');

const Products = mongoose.model('product', schemas.productSchema);

exports.getAllProducts = async () => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const products = await Products.find({});
    try {
        // disconnect database
        mongoose.disconnect();
        
        // send products to controller
        return products;
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
};

exports.getProductsByCategory = async (category) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const products = await Products.find({category});
    try {
        // disconnect database
        mongoose.disconnect();

        // send products to controller
        return products;
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
};

exports.getProductsById = async (id) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const productDetails = await Products.findById(id);

    try {
        // disconnect database
        mongoose.disconnect();

        // send product details to controller
        return productDetails;
    } catch (err) {
        mongoose.disconnect();
        throw err;
    }
} 

exports.getFProduct = async () => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const product = await Products.findOne({});
    try {
        // disconnect database
        mongoose.disconnect();

        // send product details to controller
        return product;
    } catch (err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.addProduct = async data => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        const { name, description} = data;
        const product = await Products.findOne({name, description});
        if (product) {
            mongoose.disconnect();
            return 'product has already exists';
        } else {
            await new Products(data).save();
            mongoose.disconnect();
            return 'product has been added sucessfully';
        }
    } catch(err) {
        mongoose.disconnect();
        throw err;
    }
};