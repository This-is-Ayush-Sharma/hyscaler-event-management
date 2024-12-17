import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { user } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import { event } from "../apis/postAPI";
import { toast } from "react-toastify";

const Feedback = () => {
  const [events, setEvents] = useState([]);
  const token = CheckToken();
  const fetchEvent = async () => {
    try {
      const response = await user.myRegistrations(token);
      const filteredEvents = response.data
        // .filter(
        //   (registration) => registration.event.event_status === "Completed"
        // )
        .map((registration) => ({
          ...registration.event, // Extract and use event details
          feedbacks: registration.event.feedbacks, // Include feedbacks
        }));
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
  console.log("Events", events);

  const [expandedEvents, setExpandedEvents] = useState({});
  const [newFeedback, setNewFeedback] = useState("");
  const [showRating, setShowRating] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const toggleExpand = (eventId) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId], // Toggle only the specific event
    }));
  };

  const handleAddFeedback = async (eventId) => {
    if (newFeedback.trim() === "" || (showRating && newRating === 0)) {
      alert("Please enter feedback and select a rating if applicable.");
      return;
    }
    const formData = {
      eventId,
      comment: newFeedback,
      rating: showRating ? newRating : "No rating given",
    };
    console.log("Feedback Submitted:", formData);
    try {
      const response = await event.feeback(token, formData);
      if (response.status === 201) {
        toast.success("Feedback Added");
        fetchEvent();
        setNewFeedback("");
        setNewRating(0);
        setShowRating(false);
      }
    } catch (error) {
      console.log("Error in api", error);
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-3xl font-bold mb-6 text-center">Event Feedback</h3>
      <p className="mb-8 text-center">
        Here are your events. Click on an event to view previous feedback and
        add your own.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h4
              className="text-xl font-bold mb-4 cursor-pointer text-blue-600 hover:underline"
              onClick={() => toggleExpand(event._id)}>
              {event.name}
            </h4>
            {expandedEvents[event._id] && (
              <div className="mt-4">
                {/* Previous Feedback */}
                <h5 className="font-semibold mb-2">Previous Feedback:</h5>
                {event.feedbacks.length > 0 ? (
                  <ul className="list-disc pl-5 mb-4">
                    {event.feedbacks.map((feedback, index) => (
                      <li key={index} className="mb-2">
                        <strong>{feedback.user.name}:</strong>{" "}
                        <span className="inline-flex items-center gap-1">
                          {feedback.comment}(
                          {feedback.rating && (
                            <span className="text-yellow-500 flex gap-1">
                              {[...Array(feedback.rating)].map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </span>
                          )}
                          )
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No feedback yet.</p>
                )}

                {/* Add Feedback */}
                <h5 className="font-semibold mb-2">Add Your Feedback:</h5>
                <textarea
                  className="w-full border rounded-lg p-2 mb-4"
                  placeholder="Write your feedback here..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                />
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showRating}
                      onChange={() => setShowRating(!showRating)}
                      className="w-4 h-4"
                    />
                    <span>I want to give a rating</span>
                  </label>
                </div>
                {showRating && (
                  <div className="flex mb-4">
                    <label className="font-semibold">Rating: </label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={` cursor-pointer text-2xl ${
                          newRating >= star
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => setNewRating(star)}
                      />
                    ))}
                  </div>
                )}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleAddFeedback(event._id)}>
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
