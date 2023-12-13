const mongoose = require('mongoose')
const { Schema } = mongoose;

const regSchema = new Schema({
   name: String,
   email: String,
   phone: Number,
   password: String,
   datereg: Date,
   isLoggedIn: { type: Boolean, default: false },

});

const User = mongoose.model('User', regSchema);
module.exports = User;
