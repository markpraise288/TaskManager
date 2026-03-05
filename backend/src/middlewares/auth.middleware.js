const jwt = require("jsonwebtoken");
const { asyncHandler } = require("./error.middleware");

const authMiddleware = asyncHandler((req, res, next) => {
  const authHearder = req.headers.authorization;
  if (!authHearder) {
    const error = new Error("Please provide token");
    error.statusCode = 401;
    throw error;
  }

  const token = authHearder.split(" ")[1];

  try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    throw error;
  }
  
});

module.exports = {
  authMiddleware,
};
