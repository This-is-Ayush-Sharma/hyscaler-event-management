const Event = require("../model/event");

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { name, location, startTime, endTime, description, type, event_status } = req.body;
        const event = await Event.create({ name, location, startTime, endTime, description, type, user: req.user._id, event_status });
        res.status(201).json(event);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({user: req.user._id}).populate({
            path: 'feedbacks',
            populate: { path: 'user', select: 'name' },
        });
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all events
exports.getEventsById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const events = await Event.find({user: req.user._id, _id: uid});
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { uid } = req.params; // Event ID to be updated
        const updates = req.body; // Data to update
        const event = await Event.findOneAndUpdate(
            { _id: uid, user: req.user._id }, // Ensure the event belongs to the logged-in user
            updates,
            { new: true, runValidators: true } // Return the updated event and validate the updates
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized" });
        }

        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const uid = req.params.uid; // Event ID to be deleted
        const event = await Event.findOneAndDelete({ _id: uid, user: req.user._id });

        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

exports.UpdateEventStatus = async (req, res) => {
    try {
        const events = await Event.find({}); // Fetch all events from the database

        const currentTime = new Date(); // Current timestamp

        for (let event of events) {
            let status = '';

            if (currentTime < new Date(event.startTime)) {
                status = 'Upcoming'; // Event hasn't started yet
            } else if (
                currentTime >= new Date(event.startTime) &&
                currentTime <= new Date(event.endTime)
            ) {
                status = 'Active'; // Event is happening now
            } else if (currentTime > new Date(event.endTime)) {
                status = 'Completed'; // Event has ended
            }

            if (event.event_status !== status) {
                event.event_status = status; // Update the status field
                await event.save(); // Save the updated event to the database
            }
        }
        // console.log('Event statuses updated successfully!');
        return res.status(200).json({message: "Events updated successfully!"});
    } catch (error) {
        // console.error('Error updating event statuses:', error.message);
        return res.status(400).json({ error: error.message });
    }
}