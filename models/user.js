const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    isBot: {
        type: Boolean,
    },
    firstName: {
        type: String,
    },
    userName: {
        type: String,
    },
    quotesCount: {
        type: Number,
        default: 0
    }
});

userSchema.statics.findByUserId = async (userId) => {
    const user = await User.findOne({ userId });

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;