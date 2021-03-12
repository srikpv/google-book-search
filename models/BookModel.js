const mongoose = require("mongoose");

const bookTemplate = new mongoose.Schema({
    id: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: false,
    },
    thumbnail: {
        type:String,
        required: false,
    },
    canonicalVolumeLink: {
        type:String,
        required: true,
    },
    title: {
        type:String,
        required: true,
    },
    subtitle: {
        type:String,
        required: true,
    },
    date: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('mytable', bookTemplate);