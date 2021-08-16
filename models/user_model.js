const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    phone : Number,
    email : String,
    address : String,
    age : Number,
    type : String
});

const userModel = mongoose.model('Users',userSchema);

module.exports = userModel;