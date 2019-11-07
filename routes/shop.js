const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// Index
router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:productId',shopController.getProduct);
router.get('/cart',isAuth,shopController.getCart);
router.post('/cart/:productId',isAuth,shopController.postAddItemToCart);
router.post('/cart-remove-item/:productId',isAuth,shopController.postRemoveItemFromCart);
router.get('/orders',isAuth,shopController.getOrders);
router.post('/create-order',isAuth,shopController.postAddOrder);

module.exports = router;
