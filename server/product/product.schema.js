const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
    imageUrl: {
        type: String,
        retuired: true
    },
    name: {
        type: String,
        required: true,
        index: 'text'
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true
    }
}, {timestamps: true});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);