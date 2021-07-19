const express = require('express');
const checkAuthWithRole = require('../../middleware/check-auth-with-role');
const UserRoles = require('../../_utils/user-roles');
const CartController = require('../controllers/cart.controller');
const router = express.Router();

router.put('/cart', checkAuthWithRole(UserRoles.User), CartController.addToCart);
router.get('/cart', checkAuthWithRole(UserRoles.User), CartController.getCart);
router.delete('/cart/:id', checkAuthWithRole(UserRoles.User), CartController.deleteCart);


module.exports = router;