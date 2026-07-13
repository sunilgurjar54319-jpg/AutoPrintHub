import axios from "axios";

const api = axios.create({
  baseURL: "https://autoprint-hub-server.onrender.com/api",
  timeout: 30000,
});

export default api;
