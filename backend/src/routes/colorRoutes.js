const express = require('express');
const colorRouter = express.Router();
const colorController = require('../controllers/colorController');

// 路由配置
colorRouter.get('/', colorController.getAllColors);
colorRouter.get('/:id', colorController.getColorById);
colorRouter.post('/', colorController.createColor);
colorRouter.put('/:id', colorController.updateColor);
colorRouter.delete('/:id', colorController.deleteColor);
colorRouter.get('/model/:modelId', colorController.getColorsByModelId);

module.exports = colorRouter;
