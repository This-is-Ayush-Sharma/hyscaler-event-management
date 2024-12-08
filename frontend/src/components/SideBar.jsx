import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckToken } from "../middleware/checkToken";
import { extractToken } from "../utils/extractToken";

const Sidebar = ({ setCurrentPage }) => {
  const token = CheckToken();
  const tokenData = extractToken(token);
  console.log(tokenData);

  const navigate = useNavigate();

  // Define menu items
  const allMenuItems = [
    { name: "Overview", component: "overview" },
    { name: "Register", component: "register", restrictedForOrganiser: true },
    { name: "Create Event", component: "create-event", restricted: true },
    { name: "Generate Ticket", component: "generate-ticket", restricted: true },
    { name: "Manage Events", component: "manageEvents", restricted: true },
    { name: "Attendees", component: "attendees", restricted: true },
    { name: "FeedBack", component: "feedback", restrictedForOrganiser: true },
    { name: "Notifications", component: "notifications", restricted: true },
    {
      name: "My Registrations",
      component: "my-registrations",
      restrictedForOrganiser: true,
    },
  ];

  // Filter menu items based on account_type
  const menuItems = allMenuItems.filter(
    (item) =>
      (!item.restricted || tokenData.account_type !== "attendee") &&
      (!item.restrictedForOrganiser || tokenData.account_type !== "organiser")
  );

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-600 text-white flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Event Manager</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(item.component)}
                className="w-full text-left py-3 px-6 hover:bg-slate-700 transition">
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-black py-2 rounded shadow hover:bg-gray-200">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
