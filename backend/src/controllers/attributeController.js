const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 获取商品属性
const getAttribute = async (req, res, next) => {
    try {
        const attribute = await prisma.brand.findMany({
            include: {
                models: {
                    include:{
                        capacities: true,
                        colors: true,
                        versions: true
                    }
                }
            }
        });
        res.json(attribute);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAttribute
};
