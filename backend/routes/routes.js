const router = require("express").Router();

const userController = require("../controllers/user.controller");
const eventController = require('../controllers/event.controller');
const ticketController = require('../controllers/ticket.controller');
const registerController = require('../controllers/register.controller');

router.get("/health", (req, res) => {
    res.send("App is running");
});

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);

// Event routes
router.post('/events', eventController.createEvent);
router.get('/events', eventController.getEvents);

// Ticket routes
router.post('/tickets', ticketController.createTicket);
router.get('/tickets', ticketController.getTickets);

// Registration routes
router.post('/register', registerController.registerUserForEvent);
router.get('/registrations', registerController.getRegistrations);
router.get('/registrations/event/:eventId', registerController.getRegistrationsByEvent);

module.exports = router;