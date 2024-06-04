const express = require('express');
const versionRouter = express.Router();
const versionController = require('../controllers/versionController');

// 路由配置
versionRouter.get('/', versionController.getAllVersions);
versionRouter.get('/:id', versionController.getVersionById);
versionRouter.post('/', versionController.createVersion);
versionRouter.put('/:id', versionController.updateVersion);
versionRouter.delete('/:id', versionController.deleteVersion);
versionRouter.get('/model/:modelId', versionController.getVersionsByModelId);

module.exports = versionRouter;
