const express = require('express');
const UserController = require('../controllers/user.controller');
const checkAuthWithRole = require('../../middleware/check-auth-with-role');
const UserRoles = require('../../_utils/user-roles');

const router = express.Router();

router.post("/users/signup", UserController.signupUser);
router.post("/users/signup/admin", UserController.signupAdminUser); // temporary route to setup admin user
router.post("/users/login", UserController.loginUser);
router.get("/users", checkAuthWithRole(UserRoles.Admin), UserController.getCustomers);
router.get("/users/:id", UserController.getUser);
router.post("/users/reset-password/:id", UserController.resetUserPassword);

module.exports = router;