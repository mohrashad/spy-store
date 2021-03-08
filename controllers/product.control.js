const productsModel = require('../models/products.model');

exports.getProductDetails = (req, res, next) => {
    try {
        // get product id
        const id = req.params.id;

        // get product details
        const productDetails =  productsModel.getProductsById(id);

        // render product details
        productDetails.then(productDetails =>{
            res.render('product', {
                productDetails,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                amountErr: req.flash('amountError')[0]
            })
        });
    } catch(err) {
        next(err);
    }
};

exports.getfirstProduct = (req, res, next) => {
    try {
        // get first product
        const firstProduct = productsModel.getFProduct();

        // render first product
        firstProduct.then(productDetails => res.render('product', {
            productDetails,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            amountErr: req.flash('amountError')[0]
        }));
    } catch (err) {
        next(err);
    }
}