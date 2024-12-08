import axios from "axios";
const api = import.meta.env.VITE_API;
// Auth APIs
const auth = {
  register: async (formData) => {
    try {
      const response = await axios.post(`${api}/users`, formData);

      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
  login: async (formData) => {
    try {
      const response = await axios.post(`${api}/login`, formData);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log("Error registering user:", error);
      return { data: error.response.data, status: error.response.status };
    }
  },
};

// Event APIS
const event = {
  createEvent: async (formData, token) => {
    try {
      const response = await axios.post(`${api}/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
  deleteEvent: async (uid, token) => {
    const response = await axios.delete(`${api}/events/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  },
  updateEvent: async (uid, formData, token) => {
    try {
      const response = await axios.put(`${api}/events/${uid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },

  feeback: async (token, formData) => {
    try {
      const response = await axios.post(`${api}/feedback/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },

  notification: async (token, formData) => {
    try {
      const response = await axios.post(`${api}/notification/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
};

//tickets api
const ticket = {
  createTicket: async (formData, token) => {
    try {
      const response = await axios.post(`${api}/tickets`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
  deleteTicket: async (uid, token) => {
    try {
      const response = await axios.delete(`${api}/tickets/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
};

const payment = {
  paymentIntent: async (token, amount) => {
    try {
      const response = await axios.post(
        `${api}/payment-intent/`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
};

const register = {
  registerEvent: async (token, formData) => {
    try {
      const response = await axios.post(`${api}/register/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  },
};

export { auth, event, ticket, payment, register };
