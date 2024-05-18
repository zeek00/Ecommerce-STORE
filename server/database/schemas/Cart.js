const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    items: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

cartSchema.index({ 'createdAt': 1 }, { expireAfterSeconds: 86400 });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
