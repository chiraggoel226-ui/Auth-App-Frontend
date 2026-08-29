import axios from "axios";


// ==========================================
// BACKEND URL
// ==========================================

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

        // JWT LOCAL STORAGE SE LO
        const token =
            localStorage.getItem("token");


        if (token) {

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
// 401 HANDLE
// ==========================================

api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {

        if (error.response?.status === 401) {

            console.log(
                "Unauthorized - clearing login"
            );


            localStorage.removeItem("token");

            localStorage.removeItem("user");

            sessionStorage.removeItem("token");

            sessionStorage.removeItem("user");


            window.location.href = "/login";

        }


        return Promise.reject(error);

    }
);


export default api;