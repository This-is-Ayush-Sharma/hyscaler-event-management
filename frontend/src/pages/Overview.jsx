import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { dashboard } from "../apis/getAPI";
import { CheckToken } from "../middleware/checkToken";
import { extractToken } from "../utils/extractToken";

const ITEMS_PER_PAGE = 3;

const Overview = () => {
  const token = CheckToken();
  const tokenData = extractToken(token);
  const [events, setEvents] = useState({
    active: [],
    completed: [],
    upcoming: [],
  });
  const [completedPage, setCompletedPage] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const fetchDashboardData = async () => {
    try {
      const response = await dashboard.getDashboardData(token);
      let apiEvents;

      if (tokenData.account_type === "attendee") {
        apiEvents = response.data.map((item) => item.event);
      } else if (tokenData.account_type === "organiser") {
        apiEvents = response.data;
      }

      const categorizedEvents = {
        active: apiEvents.filter((event) => event.event_status === "Active"),
        completed: apiEvents.filter(
          (event) => event.event_status === "Completed"
        ),
        upcoming: apiEvents.filter(
          (event) => event.event_status === "Upcoming"
        ),
      };

      setEvents(categorizedEvents);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const getPageItems = (items, page) => {
    const start = page * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  const renderEventCards = (events, borderColor) => {
    if (events.length === 0) {
      return (
        <div className="text-gray-500 text-center col-span-full">
          No events available
        </div>
      );
    }

    return events.map((event, index) => (
      <div
        key={event._id || index}
        className={`bg-white p-6 rounded-lg shadow border-l-4 ${borderColor}`}>
        <h5 className="text-lg font-bold mb-2">{event.name}</h5>
        <p className="text-gray-600 mb-1">Location: {event.location}</p>
        <p className="text-gray-600 mb-1">
          Start: {new Date(event.startTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">
          End: {new Date(event.endTime).toLocaleString()}
        </p>
        <p className="text-gray-600 mb-1">Description: {event.description}</p>
        <p className="text-gray-600">Status: {event.event_status}</p>
      </div>
    ));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>
      <p className="mb-8">
        Welcome to your event management dashboard! Here's a quick overview of
        your events.
      </p>

      {/* Active Events Section */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-4">Active Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderEventCards(
            getPageItems(events.active, activePage),
            "border-yellow-500"
          )}
        </div>
        {events.active.length > 0 && (
          <ReactPaginate
            pageCount={Math.ceil(events.active.length / ITEMS_PER_PAGE)}
            onPageChange={({ selected }) => setActivePage(selected)}
            containerClassName="flex justify-center items-center mt-4 space-x-2"
            pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
            previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            activeClassName="bg-blue-600 text-white font-bold"
            disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
            breakClassName="mx-2 text-gray-600"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        )}
      </div>

      {/* Completed Events Section */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-4">Completed Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderEventCards(
            getPageItems(events.completed, completedPage),
            "border-green-500"
          )}
        </div>
        {events.completed.length > 0 && (
          <ReactPaginate
            pageCount={Math.ceil(events.completed.length / ITEMS_PER_PAGE)}
            onPageChange={({ selected }) => setCompletedPage(selected)}
            containerClassName="flex justify-center items-center mt-4 space-x-2"
            pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
            previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            activeClassName="bg-blue-600 text-white font-bold"
            disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
            breakClassName="mx-2 text-gray-600"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        )}
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h4 className="text-xl font-bold mb-4">Upcoming Events</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderEventCards(
            getPageItems(events.upcoming, upcomingPage),
            "border-blue-500"
          )}
        </div>
        {events.upcoming.length > 0 && (
          <ReactPaginate
            pageCount={Math.ceil(events.upcoming.length / ITEMS_PER_PAGE)}
            onPageChange={({ selected }) => setUpcomingPage(selected)}
            containerClassName="flex justify-center items-center mt-4 space-x-2"
            pageClassName="px-3 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-200"
            previousClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            nextClassName="bg-black text-white px-3 py-2 rounded-full cursor-pointer hover:bg-gray-700"
            activeClassName="bg-blue-600 text-white font-bold"
            disabledClassName="bg-gray-300 text-gray-500 cursor-not-allowed"
            breakClassName="mx-2 text-gray-600"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
          />
        )}
      </div>
    </div>
  );
};

export default Overview;
