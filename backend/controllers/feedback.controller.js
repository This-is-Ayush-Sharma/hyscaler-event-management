const Feedback = require('../model/feedback');

// Create a Feedback
exports.createFeedback = async (req, res, next) => {
    try {
        // const user = req.user._id;
        const { user, event, rating, comment } = req.body;

        // Validate required fields
        if (!user || !rating) {
            return res.status(400).json({ message: 'User ID and Rating are required' });
        }

        // Create feedback in the database
        const feedback = await Feedback.create({
            user,
            event,
            rating,
            comment,
        });

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback,
        });
    } catch (error) {
        next(error);
    }
};

// Get Feedback for a Specific Event
exports.getEventFeedback = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        const feedbacks = await Feedback.find({ event: eventId }).populate('user', 'name email');

        res.status(200).json({
            count: feedbacks.length,
            feedbacks,
        });
    } catch (error) {
        next(error);
    }
};

// Get Feedback by User
exports.getUserFeedback = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const feedbacks = await Feedback.find({ userId }).populate('eventId', 'name location');

        res.status(200).json({
            count: feedbacks.length,
            feedbacks,
        });
    } catch (error) {
        next(error);
    }
};

// Delete Feedback
exports.deleteFeedback = async (req, res, next) => {
    try {
        const { feedbackId } = req.params;

        const feedback = await Feedback.findByIdAndDelete(feedbackId);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        next(error);
    }
};