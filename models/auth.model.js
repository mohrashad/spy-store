const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schemas = require('../schemas');

// signup auth code
const User = mongoose.model('user', schemas.userSchema);


exports.createNewUser = async ({ username, email, password, confirmPassword }) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });
    
    if (password === confirmPassword) {
        const emailExisted = await User.findOne({email});
        try {
            let hashedPass;
            if (emailExisted) {
                mongoose.disconnect();
                throw process.env.SIGNUP_EMAIL_ERROR;
            } else hashedPass = await bcrypt.hash(password, 10);

            let user = new User({username, email, password: hashedPass});
            await user.save();
            mongoose.disconnect();
        } catch (err) {
            mongoose.disconnect();
            throw err;
        }
    } else throw process.env.CONFIRM_PASSWORD_ERROR;
}


// login auth code
exports.logIn = async ({ email, password }) => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology: true});

    const user = await User.findOne({email});
    try {
        if(!user) {
            mongoose.disconnect();
            throw process.env.LOGIN_EMAIL_ERROR;
        } else {
            const same = await bcrypt.compare(password, user.password);
            if(!same) {
                mongoose.disconnect();
                throw process.env.PASSWORD_ERROR;
            }else {
                mongoose.disconnect();
                return {
                    id: user._id,
                    isAdmin: user.isAdmin
                };
            }
        }
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}

exports.getEmails = async () => {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology: true});
    try {
        const userEmails = await User.find({}, {email: 1});
        return userEmails;
    }catch(err) {
        mongoose.disconnect();
        throw err;
    }
}