const Register = require("../model/register");

// Register a user for an event
exports.registerUserForEvent = async (req, res) => {
    try {
        const { userId, eventId, ticketIds } = req.body;

        const registration = await Register.create({
            userId,
            event: eventId,
            tickets: ticketIds
        });

        res.status(201).json(registration);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all registrations
exports.getRegistrations = async (req, res) => {
    try {
        const registrations = await Register.find()
            .populate('userId', 'name email')
            .populate('event', 'name location')
            .populate('tickets');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get registrations for a specific event
exports.getRegistrationsByEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const registrations = await Register.find({ event: eventId })
            .populate('userId', 'name email')
            .populate('tickets');
        res.status(200).json(registrations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
