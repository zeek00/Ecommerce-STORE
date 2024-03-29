const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    items: { type: Array, default: null },
});

cartSchema.index({ 'expiration': 1 }, { expireAfterSeconds: 0 });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
