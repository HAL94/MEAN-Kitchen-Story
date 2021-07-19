const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const checkAuthWithRole = require('../../middleware/check-auth-with-role');
const UserRoles = require('../../_utils/user-roles');

router.get('/products', ProductController.getAllProducts);
router.get('/products/search', ProductController.searchProducts);
router.post('/products', checkAuthWithRole(UserRoles.Admin), ProductController.addProduct);
router.get('/categories', ProductController.getCategories);
router.post('/categories', checkAuthWithRole(UserRoles.Admin), ProductController.addCategory);

router.put('/products/:id', checkAuthWithRole(UserRoles.Admin), ProductController.editProduct);
router.delete('/products/:id', checkAuthWithRole(UserRoles.Admin), ProductController.deleteProduct);

module.exports = router;