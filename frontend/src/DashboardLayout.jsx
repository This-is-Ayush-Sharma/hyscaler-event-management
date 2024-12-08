import React, { useEffect, useState } from "react";
import Sidebar from "./components/SideBar";
import Overview from "./pages/Overview";
import ManageEvents from "./pages/ManageEvents";
import EventCreation from "./pages/EventCreation";
import Attendees from "./pages/Attendees";
import Notifications from "./pages/Notification";
import Registration from "./pages/Registration";
import GenerateTickets from "./pages/GenerateTicket";
import { CheckToken } from "./middleware/checkToken";
import { getEvents } from "./apis/getAPI";
import Feedback from "./pages/Feedback";
import MyRegistration from "./pages/MyRegistration";

const DashboardLayout = () => {
  const token = CheckToken();
  const fetchUpdatedData = async () => {
    await getEvents.getUpdatedEvents(token);
  };

  useEffect(() => {
    if (token) {
      fetchUpdatedData();
    }
  }, [token]);
  const [currentPage, setCurrentPage] = useState("overview");

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "register":
        return <Registration />;
      case "create-event":
        return <EventCreation />;
      case "generate-ticket":
        return <GenerateTickets />;
      case "manageEvents":
        return <ManageEvents />;
      case "attendees":
        return <Attendees />;
      case "feedback":
        return <Feedback />;
      case "notifications":
        return <Notifications />;
      case "my-registrations":
        return <MyRegistration />;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full bg-gray-800 text-white">
        <Sidebar setCurrentPage={setCurrentPage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
