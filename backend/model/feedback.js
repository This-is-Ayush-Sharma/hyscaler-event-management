const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users', // Reference to User model
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'events', // Reference to Event model
            required: false, // Optional if feedback is for a general platform
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5, // Assuming a 5-star rating system
        },
        comment: {
            type: String,
            maxlength: 500, // Limit the comment length
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);