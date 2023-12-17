const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const regSchema = new Schema({
   name: String,
   email: { type: String, unique: true },
   phone: Number,
   password: String,
   datereg: { type: Date, default: Date.now },
   isLoggedIn: { type: Boolean, default: false },

});



const User = mongoose.model('User', regSchema);
module.exports = User;
