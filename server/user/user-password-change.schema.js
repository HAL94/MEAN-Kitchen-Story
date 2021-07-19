const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userPasswordChangeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    changed: {
        type: Boolean,
        default: false
    }
})

userPasswordChangeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User_Password_Change', userPasswordChangeSchema);