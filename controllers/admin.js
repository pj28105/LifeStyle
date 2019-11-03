const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', { pageTitle: 'Add Product', product: null });
}

exports.postAddProducts = (req, res, next) => {
    newProduct = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    newProduct.save().then(result => {
    }).catch(err => console.log(err));
    res.redirect('/');
}

exports.geteditProducts = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(product => {
        res.render('admin/edit-product', { pageTitle: 'Edit Product', product: product });
    }).catch(err => console.log(err))
}

exports.posteditProducts = (req, res, next) => {
    editedProduct = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description
        ,req.params.productId);
    editedProduct.save().then(result => {
       res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        res.redirect('/invalid'); 
    }); 
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('admin/products', { prods: products, pageTitle: 'Admin Products' });
    }).catch(err => console.log(err));
}

exports.postDeleteProducts =  (req,res,next) => {
    const id = req.params.productId;
    Product.deleteById(id).then(() => {
        res.redirect('/admin/products');
    }).catch( err => {
        console.log(err);
        res.redirect('/invalid');
    });
}