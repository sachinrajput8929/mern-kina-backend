const jwt = require('jsonwebtoken');

const tokenVerify = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error("TokenMissingOrMalformed");
    }

    const token = authHeader.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET); // Throws if invalid or expired
};

module.exports = tokenVerify;
