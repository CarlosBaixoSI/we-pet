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
    logoutSuccessfull: {
        message: i18n.__('Logout successfull'),
        code: 200,
    },
    logoutFailed: {
        message: i18n.__('Logout failed'),
        code: 500,
    },
    internalServerError: {
        message: i18n.__('Internal server error'),
        code: 500,
    },
    invalidPasswordResetToken: { 
        message: i18n.__('Invalid password reset token'),
        code: 401,
    },
    passwordResetTokenExpired: {
        message: i18n.__('Password reset token expired'),
        code: 401,
    },
    passwordResetSuccessful: {
        message: i18n.__('Password reset successful'),
        code: 200,
    },
}