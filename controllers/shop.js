const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    res.render('shop/product-list', { prods: Product.fetchAll(), pageTitle: 'Products' });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    productFound = Product.findById(productId);
    if (productFound) {
        res.render('shop/product-detail', { pageTitle: productFound.title, product: productFound });
    } else {
        res.redirect('/Page Not Found');
    }
}

exports.getIndex = (req, res, next) => {
    res.render('shop/index', { prods: Product.fetchAll(), pageTitle: 'Shop' });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart' });
}

exports.postCart = (req, res, next) => {
    console.log(req.body.productId);
    res.render('shop/cart', { pageTitle: 'Cart' });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout' });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: 'Orders' });
}