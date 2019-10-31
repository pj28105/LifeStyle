const Product = require('../models/product');

exports.getAddProducts =  (req, res, next) => {
    // console.log(req);
    // res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'addProducts.html'));
    res.render('admin/addProducts', { pageTitle: 'Add Products' });
}

exports.postAddProducts = (req, res, next) => {
    // products.push({ title: req.body.title, image: req.body.image, price: req.body.price });
    newProduct = new Product(req.body.title,req.body.image,req.body.price);
    newProduct.save();
    res.redirect('/');
}

exports.getProducts =  (req, res, next) => {
    // console.log('from shop.js',adminData.products);
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop', 'index.html'));
    res.render('shop/index', { prods: Product.fetchAll(), pageTitle: 'Shop' });
}