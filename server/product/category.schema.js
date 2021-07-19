const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        retuired: true
    }
}, {timestamps: true});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);

