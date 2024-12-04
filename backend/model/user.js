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
    phone: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "inactive",
    }
});

module.exports = mongoose.model("users", user);