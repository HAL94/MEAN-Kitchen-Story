const express = require('express');
const router = express.Router();

const checkAuthWithRole = require('../../middleware/check-auth-with-role');
const UserRoles = require('../../_utils/user-roles');

const CustomerController = require('../controllers/customer.controller');

router.get("/customers", checkAuthWithRole(UserRoles.Admin), CustomerController.getCustomers);

module.exports = router;