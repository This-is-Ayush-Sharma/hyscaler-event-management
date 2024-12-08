import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { event } from "../apis/postAPI";
import { toast } from "react-toastify";
import { CheckToken } from "../middleware/checkToken";
import { useLocation } from "react-router-dom";

const EventCreation = () => {

  const token = CheckToken();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    event_status: "Upcoming",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Event", formData);

    try {
      const response = await event.createEvent(formData, token);
      if (response.status === 201) {
        toast.success("Event Created");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error in API:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Title */}
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

        {/* Event Description */}
        <div>
          <label className="block font-medium mb-2">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe your event"
            className="w-full p-3 border rounded"
            rows="4"
            required></textarea>
        </div>

        {/* Start Date and Time */}
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

        {/* End Date and Time */}
        <div>
          <label className="block font-medium mb-2">Ending Date and Time</label>
          <DatePicker
            selected={formData.endTime}
            onChange={(date) => handleChange("endTime", date)}
            showTimeSelect
            dateFormat="Pp"
            className="w-full p-3 border rounded"
            required
          />
        </div>

        {/* Location */}
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

        {/* Status Dropdown */}
        <div>
          <label className="block font-medium mb-2">Event Status</label>
          <select
            name="event_status"
            value={formData.event_status}
            onChange={(e) => handleChange("event_status", e.target.value)}
            className="w-full p-3 border rounded"
            required>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Active">Active</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreation;
