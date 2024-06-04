const express = require('express')
const tagRouter = express.Router()
const tagController = require('../controllers/tagController')

// 路由配置
tagRouter.get('/', tagController.getAllTags);
tagRouter.get('/:id', tagController.getTagById);
tagRouter.post('/', tagController.createTag);
tagRouter.put('/:id', tagController.updateTag);
tagRouter.delete('/:id', tagController.deleteTag);

module.exports = tagRouter