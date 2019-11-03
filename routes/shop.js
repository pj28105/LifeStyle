const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

// Index
router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:productId',shopController.getProduct);
router.get('/cart',shopController.getCart);
router.post('/cart/:productId',shopController.postAddItemToCart);
router.post('/cart-remove-item/:productId',shopController.postRemoveItemFromCart);
router.get('/orders',shopController.getOrders);
router.post('/create-order',shopController.postAddOrder);

module.exports = router;
