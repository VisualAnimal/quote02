const express = require('express');
const modelRouter = express.Router();
const modelController = require('../controllers/modelController');

// 路由配置
modelRouter.get('/', modelController.getAllModels);
modelRouter.get('/:id', modelController.getModelById);
modelRouter.post('/', modelController.createModel);
modelRouter.put('/:id', modelController.updateModel);
modelRouter.delete('/:id', modelController.deleteModel);
modelRouter.get('/brand/:brandId', modelController.getModelsByBrandId);

module.exports = modelRouter;
