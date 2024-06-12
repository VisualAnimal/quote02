const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// 获取商品属性
const getAttribute = async (req, res, next) => {
    // console.log(req.query.ids)
    const numberArray = req.query.ids ? req.query.ids.map(str => parseInt(str)):[];
//    console.log(numberArray)
    let whereClause = {
        userId: {
            in: numberArray
        }
    }
    try {
        const attribute = await prisma.brand.findMany({
            include: {
                models: {
                    include: {
                        capacities: {
                            include: {
                                _count: {
                                    select: {
                                        products: { where: whereClause }
                                    }
                                }
                            }
                            // include: {
                            //     products: { where: whereClause }
                            // }
                        },
                        colors: true,
                        versions: true,
                        _count: {
                            select: {
                                products: { where: whereClause }
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        products: { where: whereClause }
                    }
                },
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
