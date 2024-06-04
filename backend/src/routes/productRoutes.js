// productRouters.js
const express = require('express');
const productController = require('../controllers/productController');
const productRouter = express.Router();

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.put('/:id/refresh', productController.refreshProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.get('/user/:userId', productController.getProductsByUserId);
productRouter.get('/user/:userId/followed', productController.getProductsByFollowedUser);

module.exports = productRouter;
