const mongoose = require("mongoose");

const tickets = mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    type : {
        type: String,
        required: true,
        enum: ['general', 'VIP'],
    },
});

module.exports = mongoose.model("Ticket", tickets);