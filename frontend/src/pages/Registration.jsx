import React, { useEffect, useState } from "react";
import { getEvents, getTickets } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import { extractToken } from "../utils/extractToken";
import { payment } from "../apis/postAPI";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const token = CheckToken();
  const tokenData = extractToken(token);
  console.log(tokenData);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userData, setUserData] = useState({
    name: tokenData.name,
    email: tokenData.email,
  });

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await getEvents.getEvents(token);
      setEvents(response.data);
    } catch (error) {
      console.log("Error fetching events", error);
    }
  };

  // Fetch tickets by event ID
  const fetchTicketsByEvent = async (eventId) => {
    try {
      const response = await getTickets.getTicketByEvent(token, eventId);
      if (response.data && response.data.length > 0) {
        setTickets(response.data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.log("Error fetching tickets", error);
    }
  };

  // Fetch events on token change
  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // Handle event selection
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setTickets([]);
    setSelectedTicket(null);
    fetchTicketsByEvent(event._id);
  };

  // Handle ticket selection
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle user data change
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    const price = selectedTicket?.price * quantity;
    try {
      const formData = {
        ticketId: selectedTicket._id,
        event: selectedEvent._id,
        quantity: quantity,
      };
      const response = await payment.paymentIntent(token, price);
      console.log(response.clientSecret);
      navigate("/payment", {
        state: { clientSecret: response.clientSecret, formData },
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Event Ticketing and Registration
      </h2>

      {/* Event Selection Section */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-4">Select an Event</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition ${
                selectedEvent?._id === event._id
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleEventSelect(event)}>
              <h4 className="text-lg font-bold mb-2">{event.name}</h4>
              <h3 className="text-gray-600 mb-4">
                <span className="font-bold">Location:</span> {event.location}
              </h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              {selectedEvent?._id === event._id && (
                <span className="text-sm text-blue-600">Event Selected</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div>
          {/* Ticket Type Selection Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">Select Ticket Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition ${
                      selectedTicket?._id === ticket._id
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleTicketSelect(ticket)}>
                    <h4 className="text-lg font-bold mb-2">{ticket.type}</h4>
                    <p className="text-gray-600 mb-4">Price: ₹{ticket.price}</p>
                    {selectedTicket?.id === ticket.id && (
                      <span className="text-sm text-blue-600">
                        Ticket Selected
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p>No tickets available for this event.</p>  
              )}
            </div>
          </div>

          {/* Quantity Selection Section */}
          {selectedTicket && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Select Quantity</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border p-3 rounded-lg w-32"
              />
            </div>
          )}

          {/* User Information and Payment Section */}
          {selectedTicket && <div className="mb-12 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Enter Your Details</h3>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserDataChange}
              placeholder="Your Name"
              className="border p-3 rounded-lg w-full mb-4"
              disabled
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
              placeholder="Your Email"
              className="border p-3 rounded-lg w-full mb-4"
              disabled
            />

            {/* Payment Section */}
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="mb-4">Total: ₹{selectedTicket?.price * quantity} </p>
            <button
              onClick={handlePaymentSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Submit Payment
            </button>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Registration;
