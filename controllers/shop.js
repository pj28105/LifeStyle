const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', { prods: products, pageTitle: 'Products' });
    }).catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(product => {
        res.render('shop/product-detail', { pageTitle: product.title, product: product });
    }).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', { prods: products, pageTitle: 'Shop' });
    }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    // <<<<<<<<<<<< Dummy User   >>>>>>> Pls remove me
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', { pageTitle: 'Cart', products: products });
        }).catch(err => {
            console.log(err);
            res.redirect('/invalid');
        });
}

exports.postAddItemToCart = (req, res, next) => {
    const productId = req.params.productId;
    // <<<<<<<<<<<< Dummy User   >>>>>>> Pls remove me
    req.user.addToCart(productId).then(() => {
        res.redirect('/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}

exports.postRemoveItemFromCart = (req, res, next) => {
    const productId = req.params.productId;
    // <<<<<<<<<<<< Dummy User   >>>>>>> Pls remove me
    req.user.RemoveCart(productId).then((user) => {
        res.redirect('/cart');
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: 'Checkout' });
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders().then(({placedOrders}) => {
        res.render('shop/orders', { pageTitle: 'Orders', placedOrders: placedOrders });
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}

exports.postAddOrder = (req, res, next) => {
    req.user.addOrder().then(() => {
        res.redirect('/orders');
    }).catch(err => {
        console.log(err);
        res.redirect('/invaild');
    });
}