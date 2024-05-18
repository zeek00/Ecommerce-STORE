const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    items: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now }
});

likeSchema.index({ 'expiration': 1 }, { expireAfterSeconds: 86400 });

const Likes = mongoose.model('Likes', likeSchema);
module.exports = Likes;
