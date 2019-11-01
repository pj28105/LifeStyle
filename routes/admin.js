const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/addProduct',adminController.getAddProducts);
router.post('/addProduct', adminController.postAddProducts);
router.get('/edit-product/:productId',adminController.geteditProducts);
router.post('/edit-product/:productId',adminController.posteditProducts);
router.get('/products',adminController.getProducts);

module.exports = router;