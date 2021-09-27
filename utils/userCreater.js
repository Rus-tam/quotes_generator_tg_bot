const User = require('../models/user');

const userCreater = async (msg) => {
    let user = await User.findByUserId(msg.from.id);

    if (!user) {
        user = new User({
            userId: msg.from.id,
            isBot: msg.from.is_bot,
            firstName: msg.from.first_name,
            userName: msg.from.username,
            quotesCount: 0
        });
        await user.save();
    };

    return user;
};

module.exports = userCreater;