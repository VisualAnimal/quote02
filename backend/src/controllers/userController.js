const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                following: {
                    include:{
                        followedUser: {
                            include:{
                                products: true,
                                _count: true
                            }
                        }
                    }
                }

            }
        });
        res.json(user);
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Something went wrong' });
    }
};

const createUser = async (req, res, next) => {
    try {
        const newUser = await prisma.user.create({
            data: req.body
        });
        res.json(newUser);
    } catch (error) {
        next(error);
        // res.status(500).json({ error: 'Something went wrong' });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.json(updatedUser);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json(deletedUser);
    } catch (error) {
        // res.status(500).json({ error: 'Something went wrong' });
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
