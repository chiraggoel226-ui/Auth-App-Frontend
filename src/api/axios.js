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


/*
==================================================
REQUEST INTERCEPTOR
==================================================
*/

api.interceptors.request.use(

    (config) => {

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


/*
==================================================
RESPONSE INTERCEPTOR
==================================================
*/

api.interceptors.response.use(

    (response) => {

        return response;

    },


    (error) => {

        const status =
            error.response?.status;

        const requestUrl =
            error.config?.url || "";


        /*
        ==============================================
        IMPORTANT
        ==============================================

        Do NOT redirect when the login API itself
        returns 401.

        Login.jsx needs to receive the 401 so that
        it can show:

        "Invalid email or password."

        ==============================================
        */

        const isLoginRequest =
            requestUrl.includes(
                "/api/v1/auth/login"
            );


        if (
            status === 401 &&
            !isLoginRequest
        ) {

            /*
            ==========================================
            PROTECTED API RETURNED 401
            ==========================================

            This means the existing JWT is invalid,
            expired, or missing.

            Clear the old session and go to login.
            ==========================================
            */

            localStorage.removeItem("token");

            localStorage.removeItem("user");


            window.location.href =
                "/login";
        }


        /*
        ==============================================
        IMPORTANT

        Always reject the error so Login.jsx can
        handle the failed login request.
        ==============================================
        */

        return Promise.reject(error);

    }

);


export default api;