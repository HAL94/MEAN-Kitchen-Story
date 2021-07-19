const ProductService = require('../services/product.service');

exports.getAllProducts = async (req, res, next) => {
    return ProductService.getAllProducts(req, res, next);
}
exports.searchProducts = async (req, res, next) => {    
    return ProductService.searchProducts(req, res, next);
}

exports.addProduct = async (req, res, next) => {
    return ProductService.addProduct(req, res, next);
}

exports.editProduct = async (req, res, next) => {
    return ProductService.editProduct(req, res, next);
}

exports.deleteProduct = async (req, res, next) => {
    return ProductService.deleteProduct(req, res, next);
}

exports.addCategory = async (req, res, next) => {
    return ProductService.addCategory(req,res, next);
}

exports.getCategories = async (req, res, next) => {
    return ProductService.getCategories(req, res, next);
}