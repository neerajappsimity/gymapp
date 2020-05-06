const mongoose = require('mongoose')
const Schema = mongoose.Schema


const user = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        trim: true,
        default: null
    },
    otpForgetPassword: {
        type: String,
        trim: true,
        default: null
    },
    fcmToken: {
        type: String,
        trim: true,
        default: null
    },
    createdAt : {
        type: Number
    },
    updatedAt: {
        type: Number
    }
})

module.exports = mongoose.model('user', user)