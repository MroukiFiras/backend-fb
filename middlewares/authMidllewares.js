const jwt = require('jsonwebtoken');
const privateKey = process.env.SECRET_KEY;
const adminKey = process.env.ADMIN_KEY;

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded; // Set the decoded user data for further use if needed
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

const verifyTokenAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    let role = req.headers.role;

    if (!token || role !== 'Admin') {
        return res.status(403).json({ msg: 'Access denied for non-admin users.' });
    }

    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

const verifySecretAdmin = (req, res, next) => {
    let sk = req.query.secret;
    let ak = req.query.admin;

    if (sk === process.env.SECRET_KEY && ak === process.env.ADMIN_KEY) {
        next();
    } else {
        res.status(403).json({ error: "You can't access this route without valid secret and admin keys" });
    }
};

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    verifySecretAdmin
};
