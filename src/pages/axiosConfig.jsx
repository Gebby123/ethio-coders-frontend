import axios from "axios";
const axiosBase = axios.create({
  baseURL: "https://ethio-coders.onrender.com/api",
});

export default axiosBase;
