const i18n = require("../../services/i18n/translationService");

module.exports = {
    signupSuccessfull: {
        message: i18n.__('User created successfully'),
        code: 201,
    },
    loginSuccessfull: {
        message: i18n.__('Login successfull'),
        code: 200,
    },
    invalidCredentials: {
        message: i18n.__('Invalid credentials'),
        code: 401,
    },
    signupFailed: {
        message: i18n.__('Signup failed'),
        code: 500,
    },
    usernameAlreadyUsed: {
        message: i18n.__('Username is already in use'),
        code: 409,
    },
    emailAlreadyUsed: {
        message: i18n.__('Email is already in use'),
        code: 409,
    },
}