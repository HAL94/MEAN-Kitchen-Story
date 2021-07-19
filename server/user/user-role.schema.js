const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        enum: ['User', 'Admin'],
        required: true
    }
});

module.exports = mongoose.model('Role', roleSchema);