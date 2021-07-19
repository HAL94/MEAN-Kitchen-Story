const Cart = require('../cart.schema');
const mongoose = require('mongoose');

const ErrorHandler = require('../../_utils/handle-error');

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.user._id;        
        const cart = await Cart.findOne({user: userId})
            .populate('items.product')
            .exec();


        if (!cart) {
            return res.status(200).json(null);
        }

        return res.status(200).json({
            id: cart._id,
            userId: cart.user,
            items: cart.items.map((item) => {
                return {
                    itemPrice: item.itemPrice,
                    product: {
                        id: item.product._id,
                        imageUrl: item.product.imageUrl,
                        name: item.product.name,
                        price: item.product.price,
                        category: item.product.category
                    },
                    qt: item.qt
                }
            }),
            totalPrice: cart.totalPrice
        });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.addToCart = async (req, res, next) => {
    try {
        
        const userId = req.user._id;
        const items = req.body.items;
        const totalPrice = +req.body.totalPrice;
        let cart = await Cart.findOne({ user: userId})            
            .exec();        
        
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: items,
                totalPrice: totalPrice
            });
        } else {
            cart.items = items;
            cart.totalPrice = totalPrice;
        }

        await cart.save();

        return res.status(200).json({result: true, cartId: cart._id});
    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const cartId = req.params.id;

        const deleteResult = await Cart.remove({_id: cartId });

        if (deleteResult) {
            return res.status(200).json({result: true});
        }        

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}


