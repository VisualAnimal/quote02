const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tag categories
const getAllTagCategories = async (req, res, next) => {
  try {
    const tagCategories = await prisma.tagCategory.findMany({
      include: {
        tags: true
      }
    });
    res.json(tagCategories);
  } catch (error) {
    next(error);
  }
};

// Get a tag category by ID
const getTagCategoryById = async (req, res, next) => {
  try {
    const tagCategory = await prisma.tagCategory.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!tagCategory) {
      return res.status(404).json({ error: 'Tag category not found' });
    }
    res.json(tagCategory);
  } catch (error) {
    next(error);
  }
};

// Create a tag category
const createTagCategory = async (req, res, next) => {
  try {
    const newTagCategory = await prisma.tagCategory.create({
      data: req.body,
    });
    res.status(201).json(newTagCategory);
  } catch (error) {
    next(error);
  }
};

// Update a tag category
const updateTagCategory = async (req, res, next) => {
  try {
    const updatedTagCategory = await prisma.tagCategory.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedTagCategory);
  } catch (error) {
    next(error);
  }
};

// Delete a tag category
const deleteTagCategory = async (req, res, next) => {
  try {
    const deletedTagCategory = await prisma.tagCategory.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedTagCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTagCategories,
  getTagCategoryById,
  createTagCategory,
  updateTagCategory,
  deleteTagCategory,
};
