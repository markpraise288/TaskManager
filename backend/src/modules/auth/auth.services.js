const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const transporter = require("../../infrastructure/email/email.services");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");

const signup = async ({ email, password }, next) => {
  const userExistence = await User.findOne({ email });

  if (userExistence) {
    const error = new Error("User Already Exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credetials");
    error.statusCode = 403;
    throw error;
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

const verifyEmail = async ({ email, code }) => {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not Found");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(code, user.verificationCode);

  if (!isMatch) {
    const error = new Error("Invalid verification code");
    error.status = 400;
    throw error;
  }

  user.isVerified = true;
  await user.save();

  return "Email Verified";
};

const logout = async ({ refreshToken }) => {
  const user = await User.findOne({ refreshToken });

  if (!user) {
    const error = new Error("Access deny");
    error.statusCode = 403;
    throw error;
  }

  user.refreshToken = null;
  await user.save();

  return "Logged out";
};

const refreshAccessToken = async ({ refreshToken }) => {
  const user = await User.findOne({ refreshToken });

  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error("Invalid or Expired refresh token");
    error.statusCode = 403;
    throw error;
  }

  const accessToken = await generateAccessToken(user);

  return { accessToken };
};

module.exports = {
  signup,
  verifyEmail,
  refreshAccessToken,
  login,
  logout,
};
