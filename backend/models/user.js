const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    phone:{type:String,unique:true,required:true},
    password: { type: String, required: true },
    name: String,
    dob: Date,
});

module.exports = mongoose.model('User', userSchema);