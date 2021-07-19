const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserRoles = require('../_utils/user-roles');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: UserRoles.User        
    },
   
}, {timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);