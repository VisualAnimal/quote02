const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tags
const getAllTags = async (req, res, next) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    next(error);
  }
};

// Get a tag by ID
const getTagById = async (req, res, next) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag category not found' });
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
};

// Create a tag
const createTag = async (req, res, next) => {
  try {
    const newTag = await prisma.tag.create({
      data: req.body,
    });
    res.status(201).json(newTag);
  } catch (error) {
    next(error);
  }
};

// Update a tag 
const updateTag = async (req, res, next) => {
  try {
    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedTag);
  } catch (error) {
    next(error);
  }
};

// Delete a tag 
const deleteTag = async (req, res, next) => {
  try {
    const deletedTag = await prisma.tag.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(deletedTag);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
