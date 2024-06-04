const express = require('express')
const brandRouter = express.Router()
const brandController = require('../controllers/brandController')

// 路由配置
brandRouter.get('/', brandController.getAllBrands);
brandRouter.get('/:id', brandController.getBrandById);
brandRouter.post('/', brandController.createBrand);
brandRouter.put('/:id', brandController.updateBrand);
brandRouter.delete('/:id', brandController.deleteBrand);

module.exports = brandRouter