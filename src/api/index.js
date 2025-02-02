import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/api/v0";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 3 * 60 * 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;