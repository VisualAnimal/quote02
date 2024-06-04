const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有版本
const getAllVersions = async (req, res, next) => {
  try {
    const versions = await prisma.version.findMany();
    res.json(versions);
  } catch (error) {
    next(error);
  }
};

// 根据ID获取版本
const getVersionById = async (req, res, next) => {
  try {
    const version = await prisma.version.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!version) {
      return res.status(404).json({ error: 'Version not found' });
    }
    res.json(version);
  } catch (error) {
    next(error);
  }
};

// 创建版本
const createVersion = async (req, res, next) => {
  try {
    const newVersion = await prisma.version.create({
      data: req.body
    });
    res.status(201).json(newVersion);
  } catch (error) {
    next(error);
  }
};

// 更新版本
const updateVersion = async (req, res, next) => {
  try {
    const updatedVersion = await prisma.version.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedVersion);
  } catch (error) {
    next(error);
  }
};

// 删除版本
const deleteVersion = async (req, res, next) => {
  try {
    const deletedVersion = await prisma.version.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedVersion);
  } catch (error) {
    next(error);
  }
};

// 根据Model ID获取所有版本
const getVersionsByModelId = async (req, res, next) => {
  try {
    const modelId = parseInt(req.params.modelId);
    const versions = await prisma.version.findMany({
      where: { modelId: modelId }
    });
    res.json(versions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVersions,
  getVersionById,
  createVersion,
  updateVersion,
  deleteVersion,
  getVersionsByModelId
};
