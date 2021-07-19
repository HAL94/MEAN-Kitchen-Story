const PaymentController = require('../controllers/payment.controller');
const express = require('express');
const router = express.Router();
const UserRoles = require('../../_utils/user-roles');
const checkAuthWithRole = require('../../middleware/check-auth-with-role');

router.post('/user-payment', checkAuthWithRole(UserRoles.User), PaymentController.addPaymentDetails);

module.exports = router;
