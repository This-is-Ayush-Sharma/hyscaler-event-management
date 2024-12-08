import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { attendees } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure this is imported

const Attendees = () => {
  const token = CheckToken();
  const [events, setEvents] = useState([]);
  
  // Fetch events data
  const fetchEvents = async () => {
    const response = await attendees.getAllAttendees(token);
    setEvents(response); // This should now be the fetched data
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // Pagination state
  const ITEMS_PER_PAGE = 5;
  const [activePage, setActivePage] = useState(0);
  const [completedPage, setCompletedPage] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(0);

  // Function to paginate attendees based on page
  const paginateAttendees = (attendees, page) => {
    const startIndex = page * ITEMS_PER_PAGE;
    return attendees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // Function to categorize events based on event status
  const categorizeEvents = (events) => {
    const activeEvents = [];
    const completedEvents = [];
    const upcomingEvents = [];

    events.forEach(event => {
      if (event.event_status === "Active") {
        activeEvents.push(event);
      } else if (new Date(event.endTime) < new Date()) {
        completedEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    });

    return { activeEvents, completedEvents, upcomingEvents };
  };

  const { activeEvents, completedEvents, upcomingEvents } = categorizeEvents(events);

  // Check if there are no attendees for an event
  const renderNoAttendeesMessage = (eventType) => {
    return eventType.length === 0 ? (
      <div className="text-center text-gray-500 mt-4">No attendees available</div>
    ) : null;
  };

  // Function to download the attendees list as PDF
  const downloadPDF = (event) => {
    if (event.registrations.length === 0) return; // If no attendees, don't proceed

    const doc = new jsPDF();

    // Add title
    doc.text(`Attendees for ${event.name}`, 20, 10);

    // Create table data
    const tableData = event.registrations.map(registration => [
      registration.user.name,
      registration.user.email
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [["Name", "Email"]],
      body: tableData,
    });

    // Save the PDF
    doc.save(`${event.name}-attendees.pdf`);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Attendees Overview</h3>
      <p className="mb-8">
        Below are the attendees for your events. You can view and manage them
        based on the event type.
      </p>

      {/* Active Events Section */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-4">Active Events</h4>
        {activeEvents.length === 0 ? (
          <div className="text-center text-gray-500">No active events available</div>
        ) : (
          activeEvents.map((event, index) => (
            <div key={index} className="mb-8">
              <h5 className="text-lg font-bold mb-2">{event.name}</h5>
              <div className="bg-white p-6 rounded-lg shadow">
                {event.registrations.length === 0 ? (
                  <div className="text-center text-gray-500">No attendees available</div>
                ) : (
                  <>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginateAttendees(event.registrations, activePage).map(
                          (registration, idx) => (
                            <tr key={idx}>
                              <td className="border px-4 py-2">{registration.user.name}</td>
                              <td className="border px-4 py-2">{registration.user.email}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <ReactPaginate
                      pageCount={Math.ceil(event.registrations.length / ITEMS_PER_PAGE)}
                      onPageChange={({ selected }) => setActivePage(selected)}
                      containerClassName="flex justify-center mt-4 space-x-2"
                      pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
                      previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      activeClassName="bg-blue-600 text-white font-bold"
                      disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </>
                )}

                {/* Download Button */}
                {event.registrations.length > 0 && (
                  <button
                    onClick={() => downloadPDF(event)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Attendees as PDF
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Events Section */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-4">Completed Events</h4>
        {completedEvents.length === 0 ? (
          <div className="text-center text-gray-500">No completed events available</div>
        ) : (
          completedEvents.map((event, index) => (
            <div key={index} className="mb-8">
              <h5 className="text-lg font-bold mb-2">{event.name}</h5>
              <div className="bg-white p-6 rounded-lg shadow">
                {event.registrations.length === 0 ? (
                  <div className="text-center text-gray-500">No attendees available</div>
                ) : (
                  <>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginateAttendees(event.registrations, completedPage).map(
                          (registration, idx) => (
                            <tr key={idx}>
                              <td className="border px-4 py-2">{registration.user.name}</td>
                              <td className="border px-4 py-2">{registration.user.email}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <ReactPaginate
                      pageCount={Math.ceil(event.registrations.length / ITEMS_PER_PAGE)}
                      onPageChange={({ selected }) => setCompletedPage(selected)}
                      containerClassName="flex justify-center mt-4 space-x-2"
                      pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
                      previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      activeClassName="bg-blue-600 text-white font-bold"
                      disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </>
                )}

                {/* Download Button */}
                {event.registrations.length > 0 && (
                  <button
                    onClick={() => downloadPDF(event)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Attendees as PDF
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h4 className="text-xl font-bold mb-4">Upcoming Events</h4>
        {upcomingEvents.length === 0 ? (
          <div className="text-center text-gray-500">No upcoming events available</div>
        ) : (
          upcomingEvents.map((event, index) => (
            <div key={index} className="mb-8">
              <h5 className="text-lg font-bold mb-2">{event.name}</h5>
              <div className="bg-white p-6 rounded-lg shadow">
                {event.registrations.length === 0 ? (
                  <div className="text-center text-gray-500">No attendees available</div>
                ) : (
                  <>
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginateAttendees(event.registrations, upcomingPage).map(
                          (registration, idx) => (
                            <tr key={idx}>
                              <td className="border px-4 py-2">{registration.user.name}</td>
                              <td className="border px-4 py-2">{registration.user.email}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <ReactPaginate
                      pageCount={Math.ceil(event.registrations.length / ITEMS_PER_PAGE)}
                      onPageChange={({ selected }) => setUpcomingPage(selected)}
                      containerClassName="flex justify-center mt-4 space-x-2"
                      pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
                      previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
                      activeClassName="bg-blue-600 text-white font-bold"
                      disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
                    />
                  </>
                )}

                {/* Download Button */}
                {event.registrations.length > 0 && (
                  <button
                    onClick={() => downloadPDF(event)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Download Attendees as PDF
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Attendees;
