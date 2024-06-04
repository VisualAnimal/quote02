const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有容量
const getAllCapacities = async (req, res, next) => {
  try {
    const capacities = await prisma.capacity.findMany();
    res.json(capacities);
  } catch (error) {
    next(error);
  }
};

// 根据ID获取容量
const getCapacityById = async (req, res, next) => {
  try {
    const capacity = await prisma.capacity.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!capacity) {
      return res.status(404).json({ error: 'Capacity not found' });
    }
    res.json(capacity);
  } catch (error) {
    next(error);
  }
};

// 创建容量
const createCapacity = async (req, res, next) => {
  try {
    const newCapacity = await prisma.capacity.create({
      data: req.body
    });
    res.status(201).json(newCapacity);
  } catch (error) {
    next(error);
  }
};

// 更新容量
const updateCapacity = async (req, res, next) => {
  try {
    const updatedCapacity = await prisma.capacity.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedCapacity);
  } catch (error) {
    next(error);
  }
};

// 删除容量
const deleteCapacity = async (req, res, next) => {
  try {
    const deletedCapacity = await prisma.capacity.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedCapacity);
  } catch (error) {
    next(error);
  }
};

// 根据Model ID获取所有容量
const getCapacitiesByModelId = async (req, res, next) => {
  try {
    const modelId = parseInt(req.params.modelId);
    const capacities = await prisma.capacity.findMany({
      where: { modelId: modelId }
    });
    res.json(capacities);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCapacities,
  getCapacityById,
  createCapacity,
  updateCapacity,
  deleteCapacity,
  getCapacitiesByModelId
};
