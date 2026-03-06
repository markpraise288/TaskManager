const jwt = require('jsonwebtoken');

const generateAccessToken = async (user) => {
    return jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
}

const generateRefreshToken = async (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

module.exports = { generateAccessToken, generateRefreshToken };

