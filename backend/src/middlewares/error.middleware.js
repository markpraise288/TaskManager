const ApiResponse = require("../utils/apiResponse");

const errorMiddleware = (err, req, res, next) => {
    console.error(err.message);

    res.status(err.statusCode || 500).json( new ApiResponse(false,err.message || "server Error"));
}

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
    errorMiddleware,
    asyncHandler
}


