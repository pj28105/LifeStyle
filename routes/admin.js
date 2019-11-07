const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/addProduct',isAuth,adminController.getAddProducts);
router.post('/addProduct',isAuth,adminController.postAddProducts);
router.get('/edit-product/:productId',isAuth,adminController.geteditProducts);
router.post('/edit-product/:productId',isAuth,adminController.posteditProducts);
router.post('/delete-product/:productId',isAuth,adminController.postDeleteProducts);
router.get('/products',isAuth,adminController.getProducts);

module.exports = router;