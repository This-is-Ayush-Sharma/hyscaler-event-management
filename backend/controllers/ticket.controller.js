const Ticket = require("../model/ticket");

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const { price, type } = req.body;
        const ticket = await Ticket.create({ price, type });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tickets
exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
