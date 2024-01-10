const mongoose = require('mongoose');
const { Schema } = mongoose;

const regSchema = new Schema({
   name: { type: String, default: null },
   email: { type: String, unique: true },
   phone: Number,
   password: String,
   datereg: { type: Date, default: Date.now },
   token: {type: String},
   isLoggedIn: { type: Boolean, default: false },

});



const User = mongoose.model('User', regSchema);
module.exports = User;
