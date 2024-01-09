import axios from 'axios';
const axiosBase = axios.create({
  baseURL: "https://coders-backend.onrender.com/api",
});


export default axiosBase;