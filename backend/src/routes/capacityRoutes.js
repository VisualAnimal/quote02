const express = require('express');
const capacityRouter = express.Router();
const capacityController = require('../controllers/capacityController');

// 路由配置
capacityRouter.get('/', capacityController.getAllCapacities);
capacityRouter.get('/:id', capacityController.getCapacityById);
capacityRouter.post('/', capacityController.createCapacity);
capacityRouter.put('/:id', capacityController.updateCapacity);
capacityRouter.delete('/:id', capacityController.deleteCapacity);
capacityRouter.get('/model/:modelId', capacityController.getCapacitiesByModelId);

module.exports = capacityRouter;
