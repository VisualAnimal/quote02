const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFollows = async (req, res, next) => {
  try {
    const follows = await prisma.follow.findMany();
    res.json(follows);
  } catch (error) {
    next(error);
  }
};

const createFollow = async (req, res, next) => {
  const followerId = parseInt(req.body.followerId);
  const followedUserId = parseInt(req.body.followedUserId);
  try {
    const newFollow = await prisma.follow.create({
      data: {
        followerId,
        followedUserId,
      }
    });
    res.json(newFollow);
  } catch (error) {
    next(error);
  }
};

const deleteFollow = async (req, res, next) => {
  try {
    const deletedFollow = await prisma.follow.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedFollow);
  } catch (error) {
    next(error);
  }
};

// 获取某个用户的所有关注者
const getFollowersByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const followers = await prisma.follow.findMany({
      where: { followedUserId: userId },
      include: {
        follower: true
      }
    });
    res.json(followers);
  } catch (error) {
    next(error);
  }
};

// 获取某个用户关注的所有用户
const getFollowingByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        followedUser: true
      }
    });
    res.json(following);
  } catch (error) {
    next(error);
  }
};

// 检查两个用户之间是否存在关注关系
const checkFollowRelationship = async (req, res, next) => {
  const { followerId, followedUserId } = req.query;
  try {
    const follow = await prisma.follow.findFirst({
      where: {
        followerId: parseInt(followerId),
        followedUserId: parseInt(followedUserId)
      }
    });
    res.json({ isFollowing: !!follow });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFollows,
  createFollow,
  deleteFollow,
  getFollowersByUserId,
  getFollowingByUserId,
  checkFollowRelationship
};
