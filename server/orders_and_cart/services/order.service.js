const Order = require('../order.schema');
const mongoose = require('mongoose');

const ErrorHandler = require('../../_utils/handle-error');

exports.addOrder = async (req, res, next) => {
    try {
        
        const userId = req.user._id;
        const items = req.body.items;
        const totalPrice = +req.body.totalPrice;
       
        
        order = new Order({
                user: userId,
                items: items,
                totalPrice: totalPrice
        });

        await order.save();

        return res.status(200).json({
            result: true
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}