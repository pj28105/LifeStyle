const Product = require('../models/product');
const Order = require('../models/order');
const getTimeStamp = require('../util/timestamp');

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
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
    Product.find().then(products => {
        res.render('shop/index', { prods: products, pageTitle: 'Shop' });
    }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    // <<<<<<<<<<<< Dummy User   >>>>>>> Pls remove me
    req.user.cart.populate('items.productId').execPopulate()
        .then(products => {
            res.render('shop/cart', { pageTitle: 'Cart', products: products.items });
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

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id }).then(orders => {
        res.render('shop/orders', { pageTitle: 'Orders', orders: orders });
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}

exports.postAddOrder = (req, res, next) => {
    req.user.cart.populate('items.productId').execPopulate()
        .then(({ items }) => {
            const products = items.map(ele => {
                return {
                    productId: ele.productId._id,
                    title: ele.productId.title,
                    imageUrl: ele.productId.imageUrl,
                    price: ele.productId.price,
                    description: ele.productId.description,
                    quantity: ele.quantity
                }
            });
            const order = Order({
                user: {
                    userId: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    phone_num: req.user.phone_num,
                    address: req.user.address
                },
                order: products,
                orderDate: getTimeStamp()
            });
            order.save();
            req.user.cart.items = [];
            req.user.save();
            res.redirect("/orders");
        }).catch(err => {
            console.log(err);
            res.render("/invalid");
        });
}