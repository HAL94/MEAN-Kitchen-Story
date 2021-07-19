const CartService = require('../services/cart.service');

exports.addToCart = async (req, res, next) => {
    return CartService.addToCart(req, res, next);
}

exports.getCart = async (req, res, next) => {
    return CartService.getCart(req, res, next);
}

exports.deleteCart = async (req, res, next) => {
    return CartService.deleteCart(req, res, next);
}



