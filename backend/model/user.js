const mongoose = require('mongoose');

const user = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "inactive",
    },
    account_type:{
        type: String,
        required: true,
        enum: ["organiser", "attendee"],
        default: "attendee",
    },
    token: {
        type: String
    },
    password: {
        type: String,
    }
});

module.exports = mongoose.model("users", user);