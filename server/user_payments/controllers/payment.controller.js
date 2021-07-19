const PaymentService = require('../services/payment.service');

exports.addPaymentDetails = async (req, res, next) => {
    return PaymentService.addPaymentDetails(req, res, next);
}