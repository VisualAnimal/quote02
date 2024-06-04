const express = require('express')
const tagCategoryRouter = express.Router()
const tagCategoryController = require('../controllers/tagCategory')

// 路由配置
tagCategoryRouter.get('/', tagCategoryController.getAllTagCategories);
tagCategoryRouter.get('/:id', tagCategoryController.getTagCategoryById);
tagCategoryRouter.post('/', tagCategoryController.createTagCategory);
tagCategoryRouter.put('/:id', tagCategoryController.updateTagCategory);
tagCategoryRouter.delete('/:id', tagCategoryController.deleteTagCategory);

module.exports = tagCategoryRouter