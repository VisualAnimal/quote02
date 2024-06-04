const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFollows = async (req, res) => {
  try {
    const follows = await prisma.follow.findMany();
    res.json(follows);
  } catch (error) {
    // res.stanext(error);tus(500).json({ error: 'Something went wrong' });
    next(error);
  }
};

const createFollow = async (req, res, next) => {
  const followerId = parseInt(req.body.followerId)
  const followedUserId = parseInt(req.body.followedUserId)
  try {
    const newFollow = await prisma.follow.create({
      data: req.body
    });
    res.json(newFollow);
  } catch (error) {
    // res.status(500).json({ error: 'Something went wrong' });
    next(error);
  }
};

const deleteFollow = async (req, res) => {
  try {
    const deletedFollow = await prisma.follow.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedFollow);
  } catch (error) {
    // res.status(500).json({ error: 'Something went wrong' });
    next(error);
  }
};

module.exports = {
  getAllFollows,
  createFollow,
  deleteFollow
};
