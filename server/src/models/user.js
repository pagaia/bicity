// External Dependancies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        accessToken: { type: String },
        locale: { type: String },
        picture: { type: String },
        passwordHash: { type: String },
        role: { type: String, default: 'User' },
    },
    { timestamps: true }
);

userSchema.methods.compareToken = function compareToken(providedToken) {
    return new Promise((resolve, reject) => {
        // console.debug({providedToken, accessToken: this.accessToken})
        resolve(providedToken === this.accessToken);
        // bcrypt.compare(providedToken, this.accessToken, (err, isMatch) => {
        //   if (err) {
        //     Boom.boomify(err);
        //     reject(err);
        //   }
        //   console.debug({ providedToken, accessToken: this.accessToken });
        //   console.debug({ isMatch });
        //   resolve(isMatch);
        // });
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
