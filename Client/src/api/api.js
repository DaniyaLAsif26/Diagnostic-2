import axios from "axios";


const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const api = axios.create({
    baseURL : `${BackendURL}/api`,
    withCredentials : true,
  })

  export default api