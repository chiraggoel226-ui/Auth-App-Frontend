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

        // IMPORTANT:
        // Token localStorage se lena hai
        const token = localStorage.getItem("token");

        console.log("API REQUEST:", config.method?.toUpperCase(), config.url);
        console.log("JWT TOKEN:", token);

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

        console.error(
            "API ERROR:",
            error.response?.status,
            error.response?.data
        );


        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            sessionStorage.clear();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api;