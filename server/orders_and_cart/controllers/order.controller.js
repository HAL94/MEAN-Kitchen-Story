const OrderService = require('../services/order.service');

exports.addOrder = async (req, res, next) => {
   return OrderService.addOrder(req, res, next);
}