const authenticationService = require('../services/authenticationService.js');

exports.authenticate = async(req, res, next) => {
    const { username, password } = req.headers;
    const user = await authenticationService.authenticate(username, password);

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }

    req.user = user;
    next();
};