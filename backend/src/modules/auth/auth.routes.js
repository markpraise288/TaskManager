const express = require('express');
const { signupSchema, loginSchema, verifySchema, logoutSchema } = require('../../modules/auth/auth.validate');
const { signupHandler, verifyEmailHandler, loginHandler, logoutHandler, refreshAccessTokenHandler } = require('./auth.controller');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');

router.post('/signup', validate(signupSchema), signupHandler);
router.post('/login', validate(loginSchema), loginHandler);
router.post('/logout', validate(logoutSchema), logoutHandler);
router.post('/verify', validate(verifySchema), verifyEmailHandler);
router.get('/accessToken', refreshAccessTokenHandler);

module.exports = router;
