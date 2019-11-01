const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', { pageTitle: 'Add Product', product: null });
}

exports.postAddProducts = (req, res, next) => {
    newProduct = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    newProduct.save();
    res.redirect('/');
}

exports.geteditProducts = (req,res,next) => {
    const productId = req.params.productId;
    product = Product.findById(productId);
    res.render('admin/edit-product', { pageTitle: 'Edit Product', product: product });
}

exports.posteditProducts = (req,res,next) => {
    const productId = req.params.productId;
    if(Product.editDetails(productId,req.body.title,req.body.imageUrl,req.body.price,req.body.description))
        res.redirect('/admin/products');
    else
        res.redirect('/invalid');
}

exports.getProducts = (req, res, next) => {
    res.render('admin/products', { pageTitle: 'Admin Products', prods: Product.fetchAll() });
}