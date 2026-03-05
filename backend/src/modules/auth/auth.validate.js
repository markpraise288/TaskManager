
const joi = require('joi');

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required()
})

const verifySchema = joi.object({
    email: joi.string().email().required(),
    code: joi.string().required()
})

const logoutSchema = joi.object({
    refreshToken: joi.string().required()
});

module.exports = {
    signupSchema,
    loginSchema,
    verifySchema,
    logoutSchema
}
