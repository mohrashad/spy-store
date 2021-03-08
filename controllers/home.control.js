const productsModel = require('../models/products.model');

exports.getHome = (req, res, next) => {
    try {
        let category = req.query.category;
        const vCategories = ['all', 'clothes', 'phones', 'flowers', 'watches', 'shoes', 'computers'];
        let products;

        // check if products filtered by category
        if (category && vCategories.includes(category) && category !== 'all') {
            products = productsModel.getProductsByCategory(category);

        } else products = productsModel.getAllProducts();

        // get products from database
        products.then((products) => {
            // render products in home page
            res.render('index', {
                products, 
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                amountErr: req.flash('amountError')[0]
            });
        });
    } catch(err) {
        next(err);
    }

};