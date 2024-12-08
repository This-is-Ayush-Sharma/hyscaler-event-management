import React, { useEffect, useState } from "react";
import { user } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";

const MyRegistration = () => {
  const token = CheckToken();
  const [registrations, setRegistrations] = useState([]);

  const fetchMyRegistrations = async () => {
    try {
      const response = await user.myRegistrations(token);
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyRegistrations();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Registrations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Event Name</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Start Time</th>
              <th className="py-2 px-4 border-b">End Time</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{registration.event.name}</td>
                  <td className="py-2 px-4 border-b">{registration.event.location}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(registration.event.startTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(registration.event.endTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{registration.event.event_status}</td>
                  <td className="py-2 px-4 border-b">{registration.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRegistration;
