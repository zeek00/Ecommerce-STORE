const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    items: { type: Array, default: null },
});

likeSchema.index({ 'expiration': 1 }, { expireAfterSeconds: 0 });

const Likes = mongoose.model('Likes', likeSchema);
module.exports = Likes;
