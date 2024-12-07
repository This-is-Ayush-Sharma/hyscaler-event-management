const mongoose = require("mongoose");

const tickets = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "events",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    type : {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Ticket", tickets);