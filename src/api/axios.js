import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://auth-app-iomr.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


// ==========================================
// JWT FROM LOCAL STORAGE
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ==========================================
// HANDLE 401
// ==========================================

api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            console.error(
                "401 Unauthorized - JWT invalid/missing"
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api;