const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    items: [
        { 
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            qt: { type: Number, default: 1}, 
            itemPrice: { type: Number, required: true } 
        }
    ],
    totalPrice: { type: Number, required: true }
});

cartSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Cart', cartSchema);