import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://auth-app-iomr.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});


// ==========================================
// JWT AUTOMATICALLY ADD KARO
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = sessionStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// 401 HANDLE
// ==========================================

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);


export default api;