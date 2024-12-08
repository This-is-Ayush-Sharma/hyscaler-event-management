const Register = require("../model/register");
const Event = require("../model/event");
const {sendSingleEmailConfirmation} = require("../config/mailer.config");

// Register a user for an event
exports.registerUserForEvent = async (req, res) => {
    try {
        const user = req.user._id;
        const { quantity, event, ticket } = req.body;

        const registration = await Register.create({
            user,
            event,
            quantity,
            ticket
        });


        const eventData = await Event.findById({ _id: event});
        eventData.registrations.push(registration._id);
        await eventData.save();

        // console.log(eventData);

        // send email after registartion success
        sendSingleEmailConfirmation(req.user.email, "Registration Complete your are invited for the event",eventData, req.user);

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

exports.myRegistration = async (req, res) => {
    try{
        const user = req.user._id;
        const registrations = await Register.find({user}).populate({
            path: 'event',
            populate: { path: 'feedbacks', populate: { path: 'user'}}
        });
        console.log()
        res.status(200).json(registrations);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}