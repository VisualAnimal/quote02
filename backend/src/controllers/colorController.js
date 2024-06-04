const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有颜色
const getAllColors = async (req, res, next) => {
  try {
    const colors = await prisma.color.findMany();
    res.json(colors);
  } catch (error) {
    next(error);
  }
};

// 根据ID获取颜色
const getColorById = async (req, res, next) => {
  try {
    const color = await prisma.color.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!color) {
      return res.status(404).json({ error: 'Color not found' });
    }
    res.json(color);
  } catch (error) {
    next(error);
  }
};

// 创建颜色
const createColor = async (req, res, next) => {
  try {
    const newColor = await prisma.color.create({
      data: req.body
    });
    res.status(201).json(newColor);
  } catch (error) {
    next(error);
  }
};

// 更新颜色
const updateColor = async (req, res, next) => {
  try {
    const updatedColor = await prisma.color.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedColor);
  } catch (error) {
    next(error);
  }
};

// 删除颜色
const deleteColor = async (req, res, next) => {
  try {
    const deletedColor = await prisma.color.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedColor);
  } catch (error) {
    next(error);
  }
};

// 根据Model ID获取所有颜色
const getColorsByModelId = async (req, res, next) => {
  try {
    const modelId = parseInt(req.params.modelId);
    const colors = await prisma.color.findMany({
      where: { modelId: modelId }
    });
    res.json(colors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
  getColorsByModelId
};
