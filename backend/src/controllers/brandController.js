const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取所有品牌
const getAllBrands = async (req, res, next) => {
  try {
    const brands = await prisma.brand.findMany();
    res.json(brands);
  } catch (error) {
    next(error);
  }
};

// 根据ID获取品牌
const getBrandById = async (req, res, next) => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    next(error);
  }
};

// 创建品牌
const createBrand = async (req, res, next) => {
  try {
    const newBrand = await prisma.brand.create({
      data: req.body
    });
    res.status(201).json(newBrand);
  } catch (error) {
    next(error);
  }
};

// 更新品牌
const updateBrand = async (req, res, next) => {
  try {
    const updatedBrand = await prisma.brand.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedBrand);
  } catch (error) {
    next(error);
  }
};

// 删除品牌
const deleteBrand = async (req, res, next) => {
  try {
    const deletedBrand = await prisma.brand.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedBrand);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
};
