const i18n = require('../../services/i18n/translationService');

const errorMessages = {
    emailAlreadyUsed: i18n.__('Email already in use'),
    invalidEmail: i18n.__('Invalid email'),
    userNotFound: i18n.__('User not found'),
    weakPassword: i18n.__('Weak password'),
    invalidPassword: i18n.__('Invalid password'),
    invalidUsername: i18n.__('Invalid username'),
    usernameAlreadyUsed: i18n.__('Username already in use')
}

module.exports = errorMessages;