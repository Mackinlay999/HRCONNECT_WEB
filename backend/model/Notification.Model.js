const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    email : {
        type: String,
    },
    notificationText : {
        type: String,
    },
    notificationLink : {
        type : String,
    },
    notificationStatus : {
        type : String,
    },
    notificationTime : {
        type: Number,
    }

});

const notificationCollection = mongoose.model('notifications', notificationSchema);

module.exports = { notificationCollection };