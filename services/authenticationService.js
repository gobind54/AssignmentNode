const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.authenticate = async(username, password) => {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return false;
    }

    return user;
};