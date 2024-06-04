const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有模型
const getAllModels = async (req, res, next) => {
  try {
    const models = await prisma.model.findMany({
      include: {
        brand: true, // 如果需要包含品牌信息
      }
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

// 根据ID获取模型
const getModelById = async (req, res, next) => {
  try {
    const model = await prisma.model.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        brand: true, // 如果需要包含品牌信息
      }
    });
    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }
    res.json(model);
  } catch (error) {
    next(error);
  }
};

// 创建模型
const createModel = async (req, res, next) => {
  try {
    const newModel = await prisma.model.create({
      data: req.body
    });
    res.status(201).json(newModel);
  } catch (error) {
    next(error);
  }
};

// 更新模型
const updateModel = async (req, res, next) => {
  try {
    const updatedModel = await prisma.model.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedModel);
  } catch (error) {
    next(error);
  }
};

// 删除模型
const deleteModel = async (req, res, next) => {
  try {
    const deletedModel = await prisma.model.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedModel);
  } catch (error) {
    next(error);
  }
};

// 根据品牌ID获取所有模型
const getModelsByBrandId = async (req, res, next) => {
  try {
    const brandId = parseInt(req.params.brandId);
    const models = await prisma.model.findMany({
      where: { brandId: brandId },
      include: {
        brand: true, // 如果需要包含品牌信息
      }
    });
    res.json(models);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
  getModelsByBrandId
};
