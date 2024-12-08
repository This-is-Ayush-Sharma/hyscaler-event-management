import React, { useEffect, useState } from "react";
import { getEvents } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import { event } from "../apis/postAPI";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageEvents = () => {
  const token = CheckToken();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    event_status: "Upcoming",
  });

  const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getEvents.getAllEvents(token);
      if (response.status === 200) {
        setEvents(response.data);
      } else {
        setError("Failed to fetch events.");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("An error occurred while fetching events.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await event.deleteEvent(id, token);
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        fetchEvents();
      }
    } catch (error) {
      console.log("Error while deleting event", error);
      toast.error("Failed to delete event.");
    }
  };

  const handleEdit = (event) => {
    setFormData({
      name: event.name,
      description: event.description,
      startTime: new Date(event.startTime),
      endTime: new Date(event.endTime),
      location: event.location,
      event_status: event.event_status,
    });
    setSelectedEventId(event._id);
    setIsPopupOpen(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await event.updateEvent(selectedEventId, formData, token);
      if (response.status === 200) {
        toast.success("Event updated successfully!");
        setIsPopupOpen(false);
        fetchEvents();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    } else {
      setError("No valid token found.");
    }
  }, [token]);

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Your Events</h3>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p className="text-gray-600">No events found.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-4 border-b">Event Name</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Location</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-100 border-b last:border-none">
                  <td className="py-3 px-4">{event.name}</td>
                  <td className="py-3 px-4">
                    {new Date(event.startTime).toLocaleDateString()} :{" "}
                    {new Date(event.startTime).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">{event.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded text-white text-sm ${
                        event.event_status === "Active"
                          ? "bg-green-500"
                          : event.event_status === "Draft"
                          ? "bg-yellow-500"
                          : event.event_status === "Completed"
                          ? "bg-gray-500"
                          : "bg-blue-500"
                      }`}>
                      {event.event_status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => handleEdit(event)}>
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(event._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Event Title</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter event title"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Event Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your event"
                  className="w-full p-3 border rounded"
                  rows="4"
                  required></textarea>
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Starting Date and Time
                </label>
                <DatePicker
                  selected={formData.startTime}
                  onChange={(date) => handleChange("startTime", date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Ending Date and Time
                </label>
                <DatePicker
                  selected={formData.endTime}
                  onChange={(date) => handleChange("endTime", date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter event location"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Event Status</label>
                <select
                  name="event_status"
                  value={formData.event_status}
                  onChange={(e) =>
                    handleChange("event_status", e.target.value)
                  }
                  className="w-full p-3 border rounded"
                  required>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Draft">Draft</option>
                  <option value="Completed">Completed</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
                  Update Event
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
                  onClick={() => setIsPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
