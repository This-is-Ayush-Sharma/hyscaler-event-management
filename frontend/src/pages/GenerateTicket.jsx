import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { getEvents, getTickets } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import { ticket } from "../apis/postAPI";
import { toast } from "react-toastify";

const GenerateTicket = () => {
  const token = CheckToken();
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const response = await getEvents.getAllEvents(token);
      setEvents(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const [tickets, setTickets] = useState([]);
  const fetchTickets = async () => {
    try {
      const response = await getTickets.getAllTickets(token);
      setTickets(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
      fetchTickets();
    }
  }, [token]);

  console.log(tickets);

  const [formData, setFormData] = useState({
    price: "",
    type: "",
    event: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle ticket creation
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await ticket.createTicket(formData, token);

      if (response === 201) {
        toast.success("Ticket Created");
        fetchTickets();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error in console", error);
    }
  };

  const handleDeleteTicket = async (id) => {
    console.log(id);
    try {
      const response = await ticket.deleteTicket(id, token);
      if (response === 200) {
        toast.success("Deleted");
        fetchTickets();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in api", error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-12">
      <h2 className="text-2xl font-bold mb-6">Generate Tickets</h2>

      {/* Create Ticket Form */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Create New Ticket</h3>
        <form
          className="bg-white p-6 rounded-lg shadow space-y-4"
          onSubmit={handleCreateTicket}>
          <div>
            <label
              htmlFor="event"
              className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
            </label>
            <select
              id="event"
              name="event"
              value={formData.event}
              onChange={handleInputChange}
              className="border rounded-lg w-full p-3" required>
              <option value="">Choose an event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border rounded-lg w-full p-3" required>
              <option value="">Choose a type</option>
              <option value="VIP">VIP</option>
              <option value="General Admission">General Admission</option>
              <option value="Student">Student</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border rounded-lg w-full p-3"
              placeholder="Enter ticket price"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Ticket
          </button>
        </form>
      </div>

      {/* Display Created Tickets */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">Created Tickets</h3>
        <div className="flex flex-wrap gap-6">
          {tickets.map((ticket, id) => (
            <div
              key={id}
              className="bg-white p-6 rounded-lg shadow-lg mb-4 w-1/3">
              <div className="flex items-center gap-4 mb-4">
                <FaTicketAlt className="text-blue-500 text-3xl" />
                <div>
                  <h5 className="text-lg font-bold">{ticket.event.name}</h5>
                  <p className="text-gray-600 text-sm italic">
                    <strong>Type:</strong> {ticket.type}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                <strong>Price:</strong> ₹{ticket.price}
              </p>
              <button
                onClick={() => handleDeleteTicket(ticket._id)}
                className="mt-4 text-red-500 hover:text-red-700 text-sm font-semibold">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateTicket;
