const express = require('express')
const attributeRouter = express.Router()
const attributeController = require('../controllers/attributeController')

// 路由配置
attributeRouter.get('/', attributeController.getAttribute);

module.exports = attributeRouter