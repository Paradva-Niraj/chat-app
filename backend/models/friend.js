const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        }
    ]
});

module.exports = mongoose.model('Friend', friendSchema);
