// External Dependancies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        accessToken: {
            type: String,
        },
        locale: {
            type: String,
        },
        picture: {
            type: String,
        },
        passwordHash: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.methods.compareToken = function compareToken(providedToken) {
    return new Promise((resolve, reject) => {
        // console.log({providedToken, accessToken: this.accessToken})
        resolve(providedToken === this.accessToken);
        // bcrypt.compare(providedToken, this.accessToken, (err, isMatch) => {
        //   if (err) {
        //     Boom.boomify(err);
        //     reject(err);
        //   }
        //   console.log({ providedToken, accessToken: this.accessToken });
        //   console.log({ isMatch });
        //   resolve(isMatch);
        // });
    });
};

userSchema.methods.verifyPassword = function (password, hash) {
    return new Promise((resolve, reject) => {
        console.log({ password, passwordHash: this.passwordHash });
        bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
            if (err) {
                Boom.boomify(err);
                reject(err);
            }
            console.log({ password, passwordHash: this.passwordHash });
            console.log({ isMatch });
            resolve(isMatch);
        });
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
