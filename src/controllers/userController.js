const UserService = require('../services/userService');

const getCurrentUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const userDTO = await UserService.getUserById(id);
        res.json(userDTO);
    } catch (err) {
        next(err);
    }
};

module.exports = { getCurrentUser };
