const Ticket = require("../model/ticket");
const Event = require("../model/event");

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const user = req.user._id;
        const { price, type, event} = req.body;
        const ticket = await Ticket.create({ price, type, event, user });
        res.status(201).json(ticket);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all tickets
exports.getTickets = async (req, res) => {
    try {
        const user = req.user._id;
        const tickets = await Ticket.find({user: user}).populate('event');
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTicket = async (req, res) => {
    try{
        const uid = req.params.uid; // Event ID to be deleted
        const ticket = await Ticket.findOneAndDelete({ _id: uid, user: req.user._id });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found or unauthorized" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

exports.getTicketByEventId = async (req, res) => {
    try{
        const { eventId } = req.params;
        const eventDetails = await Ticket.find({event: eventId});
        if (!eventDetails) {
            return res.status(404).json({ message: "Event does not exist" });
        }
        res.status(200).json(eventDetails);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
