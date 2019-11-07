const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        product: null,
    });
}

exports.postAddProducts = (req, res, next) => {
    newProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    });
    newProduct.save().then(result => {
    }).catch(err => console.log(err));
    res.redirect('/');
}

exports.geteditProducts = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(product => {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            product: product,
        });
    }).catch(err => console.log(err))
}

exports.posteditProducts = (req, res, next) => {
    Product.findById(req.params.productId).then(product => {
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.save();
    }).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
        });
    }).catch(err => console.log(err));
}

exports.postDeleteProducts = (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id).then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid');
    });
}