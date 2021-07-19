const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userPaymentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cardHolderName: { type: String, required: true},
    cardNumber: { type: String, required: true},
    cardExpiration: { type: String, required: true},
    ccv: { type: String, required: true },
    address: {type: String, required: true},
    locale: {type: String},
    city: {type: String},
    postalCode: {type: String, required: true},
    country: {type: String, required: true}
}, {timestamps: true});


userPaymentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User_Payment', userPaymentSchema);

