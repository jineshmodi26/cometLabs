const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required",
        trim: true
    },
    email: {
        type: String,
        required: "Email is required",
        unique: "Email is already exists",
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: "Password is required",
        minlength: 8,
        trim: true,
        match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/,"Password must contain uppercase,lowercase,number and special symbol"]
    },
    role: {
        type: String,
        enum: ['admin', 'participant'],
        required: "Role is required"
    }
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {expiresIn : "24h"});
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email : email })

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User