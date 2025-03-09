import axios from "axios";

const API = {
  HOST: "http://192.168.1.7:5000/",

  LOGIN: { url: "api/login", method: "POST" },

  GET_DASHBOARD: { url: "api/get_dashboard_data", method: "POST" },

  GET_TASK_LIST: { url: "api/get_task", method: "POST" },
  GET_EVENT_LIST: { url: "api/get_event", method: "POST" },
  GET_TASK_IDS: { url: "api/get_taskids", method: "POST" },

  CREATE_TASK: { url: "api/add_task", method: "POST" },
  CREATE_EVENT: { url: "api/add_event", method: "POST" },

  DELETE_TASK: { url: "api/delete_task", method: "POST" },
  DELETE_EVENT: { url: "api/delete_event", method: "POST" },
};

export default API;

const token = localStorage.getItem("token");

const BASE_URL = `${API.HOST}`;

const action = async (endpoint, payload = {}, { headers = {} } = {}) => {
  const { url, method } = endpoint;
  const fullUrl = `${BASE_URL}${url}`;

  const defaultHeaders = {
    " x-access-token": token,
    ...headers,
  };

  try {
    let response;
    switch (method) {
      case "GET":
        response = await axios.get(fullUrl, {
          params: payload,
          headers: defaultHeaders,
        });
        break;
      case "POST":
        response = await axios.post(fullUrl, payload, {
          headers: defaultHeaders,
        });
        break;
      case "PUT":
        response = await axios.put(fullUrl, payload, {
          headers: defaultHeaders,
        });
        break;
      case "DELETE":
        response = await axios.delete(fullUrl, {
          headers: defaultHeaders,
          payload,
        });
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export { action };
