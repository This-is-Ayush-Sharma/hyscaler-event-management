const router = require("express").Router();

const userController = require("../controllers/user.controller");
const eventController = require('../controllers/event.controller');
const ticketController = require('../controllers/ticket.controller');
const registerController = require('../controllers/register.controller');
const feedbackController = require('../controllers/feedback.controller');
const notificationController = require('../controllers/notification.controller');

const { verifyToken } = require('../middleware/isAuth');
const paymentController = require("../controllers/payment.controller");
const dashboardController = require("../controllers/Dashboard.controller");

router.get("/health", (req, res) => {
    res.send("App is running");
});

// User routes
router.post("/login", userController.login);
router.post('/users', userController.createUser);
router.get('/users/:uid', userController.verifyAccount);
router.get('/users', userController.getUsers);

// Event routes
router.post('/events', verifyToken, eventController.createEvent);
router.get('/events', verifyToken, eventController.getEvents);
router.get('/events/:uid', verifyToken, eventController.getEventsById);
router.put('/events/:uid', verifyToken, eventController.updateEvent);
router.delete('/events/:uid', verifyToken, eventController.deleteEvent);
//update event status
router.get('/event/eventstatus', verifyToken, eventController.UpdateEventStatus);

// Ticket routes
router.post('/tickets', verifyToken, ticketController.createTicket);
router.get('/tickets', verifyToken, ticketController.getTickets);
router.delete('/tickets/:uid', verifyToken, ticketController.deleteTicket);
router.get("/tickets/:eventId", verifyToken, ticketController.getTicketByEventId);

//My registration
router.get("/my-registrations", verifyToken, registerController.myRegistration);

// Registration routes
router.post('/register', verifyToken, registerController.registerUserForEvent);
router.get('/registrations', registerController.getRegistrations);
router.get('/registrations/event/:eventId', registerController.getRegistrationsByEvent);

// feedback routes
router.post('/feedback', verifyToken, feedbackController.createFeedback);
router.get('/feedback/:eventId', feedbackController.getEventFeedback);
// router.get('/feedback/:userId', feedbackController.getUserFeedback);
router.delete('/feedback/:feedbackId', feedbackController.deleteFeedback);

//send notification
router.post('/notification', verifyToken, notificationController.sendNotification);


//payment
router.post("/payment-intent", verifyToken, paymentController.paymentIntent);

//dashboard
router.get('/dashboard', verifyToken, dashboardController.dashboard);

// Get events attendees detail
router.get('/attendees', verifyToken, userController.eventAttendees);


// all events
router.get('/all-events', verifyToken, eventController.allEvents);
module.exports = router;