
const UserService = require('../services/user.service');

exports.signupAdminUser = async (req, res, next) => {
    return UserService.signupAdminUser(req, res, next);
}

exports.signupUser = async (req, res, next) => {
    return UserService.signupUser(req, res, next);
}

exports.loginUser = async (req, res, next) => {
    return UserService.loginUser(req, res, next);
}

exports.getUser = async (req, res, next) => {
    return UserService.getUser(req, res, next);
}

exports.resetUserPassword = async (req, res, next) => {
    return UserService.resetUserPassword(req, res, next);
}

exports.getCustomers = async (req, res, next) => {
    return UserService.getCustomers(req, res, next);
}