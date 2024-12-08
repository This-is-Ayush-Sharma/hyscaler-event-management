import React, { useEffect, useState } from "react";
import { CheckToken } from "../middleware/checkToken";
import { getEvents } from "../apis/getAPI";
import { event } from "../apis/postAPI";

const Notifications = () => {
  const [events, setEvents] = useState([]);
  const token = CheckToken();
  const fetchEvent = async () => {
    try {
      const response = await getEvents.getAllEvents(token);
      const filteredEvents = response.data.filter(
        (event) => event.event_status === "Upcoming"
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvent();
    }
  }, [token]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle send notification action
  const handleSendNotification = async (eventId) => {
    const formData = {
      event: eventId,
      subject,
      message,
    };
    console.log(formData);

    try {
      const response = await event.notification(token, formData);
      console.log(response);
    } catch (error) {}

    // const event = events.find((e) => e.id === eventId);
    // if (event) {
    //   const recipients = event.attendees
    //     .map((attendee) => attendee.email)
    //     .join(", "); // Join emails with commas for mailto format

    //   const subject = `Notification for ${event.title}`;
    //   const body = encodeURIComponent(messages[eventId] || ""); // Get message for the event
    //   const mailtoLink = `mailto:${recipients}?subject=${subject}&body=${body}`;

    //   // Open mail client with prefilled data
    //   window.location.href = mailtoLink;
    // }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">
        Send Notifications to Event Attendees
      </h3>
      <div className="space-y-8">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold">{event.name}</h4>
            <input
              className="w-full mt-4 p-3 border rounded-md shadow-sm"
              rows="4"
              placeholder="Write your subject here..."
              value={subject} // Ensure each event has its own message
              onChange={(e) => handleSubjectChange(e)}
            />
            <textarea
              className="w-full mt-4 p-3 border rounded-md shadow-sm"
              rows="4"
              placeholder="Write your notification message here..."
              value={message} // Ensure each event has its own message
              onChange={(e) => handleMessageChange(e)}
            />
            <button
              onClick={() => handleSendNotification(event._id)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700">
              Send Notification
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
