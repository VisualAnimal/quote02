// followRoutes.js
const express = require('express');
const followController = require('../controllers/followController');
const followRouter = express.Router();

followRouter.get('/', followController.getAllFollows);
followRouter.post('/', followController.createFollow);
followRouter.delete('/:id', followController.deleteFollow);

module.exports = followRouter;
