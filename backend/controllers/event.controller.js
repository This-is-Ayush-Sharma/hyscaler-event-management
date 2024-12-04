const Event = require("../model/event");

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { name, location, startDate, endDate, description, type } = req.body;
        const event = await Event.create({ name, location, startDate, endDate, description, type });
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
