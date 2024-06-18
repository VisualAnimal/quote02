const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        model: true,
        capacity: true,
        color: true,
        version: true,
        user: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = await prisma.product.create({
      data: req.body
    });
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};

const getProductsByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    const brandId = req.query.brandId ? parseInt(req.query.brandId) : null;
    const modelId = req.query.modelId ? parseInt(req.query.modelId) : null
    const capacityId = req.query.capacityId ? parseInt(req.query.capacityId) : null

    const whereClause = {
      userId
    }

    if (brandId !== null) {
      whereClause.brandId = brandId;
    }

    if (modelId !== null) {
      whereClause.modelId = modelId;
    }

    if (capacityId !== null) {
      whereClause.capacityId = capacityId;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
      include: {
        brand: true,
        model: true,
        capacity: true,
        color: true,
        version: true
      }

    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductsByFollowedUser = async (req, res, next) => {
  console.log(req.query.page)
  const skip = (parseInt(req.query.page) - 1) * parseInt(req.query.pageSize);
  const take = parseInt(req.query.pageSize);
  console.log(skip)
  console.log(take)
  // const skip = (3 - 1) * 5;
  // const take = 5;
  try {
    // 找到当前用户关注的用户的 ID 以及相关的 profit
    const followedUsers = await prisma.follow.findMany({
      where: { followerId: parseInt(req.params.userId) },
      select: {
        followedUserId: true,
        profit: true
      }
    });

    const followedUserIds = followedUsers.map(follow => follow.followedUserId);

    if (followedUserIds.length === 0) {
      return res.json([]); // 如果用户没有关注任何人，则返回空数组
    }

    // 查找关注的用户发布的产品
    const brandId = req.query.brandId ? parseInt(req.query.brandId) : null
    const modelId = req.query.modelId ? parseInt(req.query.modelId) : null
    const capacityId = req.query.capacityId ? parseInt(req.query.capacityId) : null
    const whereClause = {
      userId: {
        in: followedUserIds
      }
    }

    if (brandId !== null) {
      whereClause.brandId = brandId;
    }

    if (modelId !== null) {
      whereClause.modelId = modelId;
    }
    if (capacityId !== null) {
      whereClause.capacityId = capacityId
    }
    // console.log(whereClause)
    const products = await prisma.product.findMany({
      where: whereClause,
      skip: skip,
      take: take,
      orderBy: { updatedAt: 'desc' },
      include: {
        brand: true,
        model: true,
        capacity: true,
        color: true,
        version: true,
        user: true
      }
    });

    // 构建一个映射，将 followedUserId 映射到 profit
    const profitMap = followedUsers.reduce((acc, follow) => {
      acc[follow.followedUserId] = follow.profit;
      return acc;
    }, {});

    // 将 profit 添加到每个产品中
    const productsWithProfit = products.map(product => ({
      ...product,
      profit: profitMap[product.userId] // 添加 profit 信息
    }));

    res.json(productsWithProfit);
  } catch (error) {
    next(error);
  }
};

const refreshProduct = async (req, res, next) => {
  const productId = parseInt(req.params.id);

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { updatedAt: new Date() } // 更新产品的 updatedAt 字段为当前时间
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
  getProductsByFollowedUser,
  refreshProduct
};