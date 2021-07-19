const CustomerService = require('../services/customer.service');

exports.getCustomers = async (req, res, next) => {
    return CustomerService.getCustomers(req, res, next);
}