const mongoose = require("mongoose");

const events = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    event_status: {
        type: String,
        default: 'Upcoming',
        enum: ['Upcoming', 'Active', 'Completed', 'Draft'],
    },
    registrations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Register'
        }
    ]
});

module.exports = mongoose.model("events", events);