const mongoose = require('mongoose')
const Schema = mongoose.Schema

const task = new Schema({
    title: {
        type: String,
        lowercase: true,
        trim: true
    },
    start_date: {
        type: String,
        trim: true
    },
    start_time: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    timer: {
        type: String,
        trim: true
    },
    createdById: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        default: 'send'
    },
    senderId: {
        type: String,
        trim: true
    },
    createdAt: {
        type:Number
    },
    updatedAt: {
        type: Number
    }

})

module.exports = mongoose.model('task', task)