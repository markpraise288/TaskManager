const {
  signup,
  verifyEmail,
  login,
  logout,
  refreshAccessToken,
} = require("./auth.services");
const { asyncHandler } = require("../../middlewares/error.middleware");
const ApiResponse = require("../../utils/apiResponse");

const signupHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const response = await signup({ email, password });

  res.status(201).json(new ApiResponse(true, "Account Created", response));
});

const verifyEmailHandler = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const response = await verifyEmail({ email, code });

  res.status(200).json(new ApiResponse(true, response));
});

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const response = await login({ email, password });

  res.cookie("refreshToken", response.refreshToken, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res
    .status(200)
    .json(
      new ApiResponse(true, "Logged in successfully", response.accessToken),
    );
});

const logoutHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  const response = await logout({ refreshToken: refreshToken});

  res.clearCookie("refreshToken");
  res.status(200).json(new ApiResponse(true, response));
});

const refreshAccessTokenHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;      

  if (!refreshToken) {
    const error = new Error("Missing credentials");
    error.statusCode = 400;
    throw error;
  }

  const response = await refreshAccessToken({ refreshToken: refreshToken });

  res.status(200).json(new ApiResponse(true, "Refresh token given", response));
});

module.exports = {
  signupHandler,
  verifyEmailHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
};
