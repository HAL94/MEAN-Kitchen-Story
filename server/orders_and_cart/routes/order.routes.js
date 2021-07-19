const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const UserRoles = require('../../_utils/user-roles');
const checkAuthWithRole = require('../../middleware/check-auth-with-role');

router.post('/order', checkAuthWithRole(UserRoles.User), OrderController.addOrder);

module.exports = router;