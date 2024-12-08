import axios from "axios";
const api = import.meta.env.VITE_API;
// Events api
const getEvents = {
  getAllEvents: async (token) => {
    try {
      const response = await axios.get(`${api}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
  getEventById: async (uid, token) => {
    try {
      const response = await axios.get(`${api}/events/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
  getUpdatedEvents: async (token) => {
    try {
      const response = await axios.get(`${api}/event/eventstatus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.status;
    } catch (error) {
      console.log("Error", error);
    }
  },
  getEvents: async (token) => {
    try {
      const response = await axios.get(`${api}/all-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
};

const getTickets = {
  getAllTickets: async (token) => {
    try {
      const response = await axios.get(`${api}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
  getTicketByEvent: async (token, eventId) => {
    try {
      const response = await axios.get(`${api}/tickets/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
};

const dashboard = {
  getDashboardData: async (token) => {
    try {
      const response = await axios.get(`${api}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
};

const attendees = {
  getAllAttendees: async (token) => {
    try {
      const response = await axios.get(`${api}/attendees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  },
};

const user = {
  myRegistrations: async (token) => {
    try {
      const response = await axios.get(`${api}/my-registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error", error);
    }
  },
};

export { getEvents, getTickets, dashboard, attendees, user };
