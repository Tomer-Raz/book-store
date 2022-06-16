import mongoose from "mongoose";
import isEmail from "validator/lib/isemail.js";
import isStrongPassword from "validator/lib/isstrongpassword.js";
import jwt from 'jsonwebtoken'
import environments from "../../config/environments.js";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'First name is requied!']
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Last name is required!']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'email must be unique!'],
        validate(value) {
            if (!isEmail(value)) {
                throw new Error("Invalid email")
            }
        },
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required!'],
        validate(value) {
            if (!isStrongPassword(value, { minLength: 6, minSymbols: 0 })) {
                throw new Error("Make sure the password contains an uppercase character, a lowercase character, a number, and at least 6 characters long")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

//hashing the user's password
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});


//creating the token field
userSchema.methods.createToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, environments.TOKEN_SECRET);
    user.tokens.push({ token: token });
    await user.save();
    return token;
}

userSchema.statics.findUserByDetails = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('Unable to login')

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesPasswordMatch) throw new Error("Unable to login");

    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.__v;

    return userObj;
};

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'ownerID',

})

const User = mongoose.model("User", userSchema)

export default User;