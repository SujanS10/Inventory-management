import axios from "axios";

const API = axios.create({
  baseURL: "http://https://inventory-management-o0bg.onrender.com/api"
});

export default API;