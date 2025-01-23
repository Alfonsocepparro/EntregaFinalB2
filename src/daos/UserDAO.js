const User = require('../models/User');

class UserDAO {
    async findById(userId) {
        return await User.findById(userId);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async save(user) {
        return await user.save();
    }
}

module.exports = new UserDAO();
