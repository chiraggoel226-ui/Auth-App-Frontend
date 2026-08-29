import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";

import {
    Mail,
    Lock,
    ArrowRight,
    ShieldCheck,
    Eye,
    EyeOff
} from "lucide-react";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // ==========================================
    // LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            // Clear old authentication data
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");


            // ==========================================
            // LOGIN REQUEST
            // ==========================================

            const response = await api.post(
                "/api/v1/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );


            console.log(
                "LOGIN STATUS:",
                response.status
            );

            console.log(
                "LOGIN RESPONSE:",
                response.data
            );


            // ==========================================
            // GET JWT TOKEN
            // ==========================================

            const token = response.data?.token;


            // No token received
            if (!token) {

                console.error(
                    "JWT token not received from backend."
                );

                setError(
                    "Login failed. Authentication token was not received."
                );

                return;
            }


            // ==========================================
            // SAVE JWT IN LOCAL STORAGE
            // ==========================================

            localStorage.setItem(
                "token",
                token
            );


            // ==========================================
            // SAVE USER DATA
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


            // ==========================================
            // VERIFY TOKEN WAS SAVED
            // ==========================================

            const savedToken =
                localStorage.getItem("token");


            console.log(
                "TOKEN SAVED:",
                savedToken
            );


            if (!savedToken) {

                setError(
                    "Unable to save login session."
                );

                return;
            }


            // ==========================================
            // GO TO DASHBOARD
            // ==========================================

            navigate("/dashboard");


        } catch (err) {

            console.error(
                "LOGIN ERROR:",
                err
            );


            // ==========================================
            // BACKEND ERROR
            // ==========================================

            if (err.response) {

                console.error(
                    "STATUS:",
                    err.response.status
                );

                console.error(
                    "SERVER ERROR:",
                    err.response.data
                );


                // Unauthorized
                if (err.response.status === 401) {

                    setError(
                        "Invalid email or password."
                    );

                } else {

                    setError(
                        err.response.data?.message ||
                        "Invalid email or password."
                    );
                }

            } else {

                setError(
                    "Cannot connect to server. Please try again."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    const handleGoogleLogin = () => {

        // Clear old JWT before OAuth login
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.clear();


        window.location.href =
            `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
    };


    // ==========================================
    // GITHUB LOGIN
    // ==========================================

    const handleGithubLogin = () => {

        // Clear old JWT before OAuth login
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.clear();


        window.location.href =
            `${import.meta.env.VITE_API_URL}/oauth2/authorization/github`;
    };


    return (

        <div className="login-page">

            {/* ========================================== */}
            {/* LEFT SIDE */}
            {/* ========================================== */}

            <section className="login-left">

                <div className="logo">

                    <div className="logo-icon">
                        <ShieldCheck size={25} />
                    </div>

                    <span>
                        AuthHub
                    </span>

                </div>


                <div className="hero-content">

                    <p className="small-heading">
                        SECURE • SIMPLE • MODERN
                    </p>


                    <h1>

                        Welcome back.

                        <br />

                        <span>
                            Manage everything
                        </span>

                        <br />

                        in one place.

                    </h1>


                    <p className="hero-text">

                        Securely manage users,
                        authentication, and your
                        application from one powerful
                        dashboard.

                    </p>


                    <div className="feature-list">

                        <div className="feature">

                            <div className="feature-check">
                                ✓
                            </div>

                            <span>
                                Secure authentication
                            </span>

                        </div>


                        <div className="feature">

                            <div className="feature-check">
                                ✓
                            </div>

                            <span>
                                Easy user management
                            </span>

                        </div>


                        <div className="feature">

                            <div className="feature-check">
                                ✓
                            </div>

                            <span>
                                Google & GitHub login
                            </span>

                        </div>

                    </div>

                </div>


                <p className="copyright">
                    © 2026 AuthHub.
                    All rights reserved.
                </p>

            </section>


            {/* ========================================== */}
            {/* RIGHT SIDE */}
            {/* ========================================== */}

            <section className="login-right">

                <div className="login-box">

                    <div className="mobile-logo">
                        <ShieldCheck size={25} />
                    </div>


                    <h2>
                        Sign in
                    </h2>


                    <p className="login-subtitle">
                        Welcome back! Please enter
                        your details.
                    </p>


                    {/* ========================================== */}
                    {/* ERROR */}
                    {/* ========================================== */}

                    {error && (

                        <div className="message error-message">
                            {error}
                        </div>

                    )}


                    {/* ========================================== */}
                    {/* LOGIN FORM */}
                    {/* ========================================== */}

                    <form onSubmit={handleSubmit}>

                        {/* EMAIL */}

                        <div className="form-group">

                            <label>
                                Email address
                            </label>


                            <div className="login-input">

                                <Mail size={19} />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <div className="password-label">

                                <label>
                                    Password
                                </label>

                                <a
                                    href="#"
                                    onClick={(e) =>
                                        e.preventDefault()
                                    }
                                >
                                    Forgot password?
                                </a>

                            </div>


                            <div className="login-input">

                                <Lock size={19} />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />


                                <button
                                    type="button"
                                    className="eye-button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <span>
                                    Signing in...
                                </span>

                            ) : (

                                <>
                                    <span>
                                        Sign in
                                    </span>

                                    <ArrowRight size={19} />
                                </>

                            )}

                        </button>

                    </form>


                    {/* ========================================== */}
                    {/* DIVIDER */}
                    {/* ========================================== */}

                    <div className="divider">

                        <span>
                            OR CONTINUE WITH
                        </span>

                    </div>


                    {/* ========================================== */}
                    {/* GOOGLE */}
                    {/* ========================================== */}

                    <button
                        type="button"
                        className="oauth-button"
                        onClick={handleGoogleLogin}
                    >

                        <span className="google-logo">
                            G
                        </span>

                        <span>
                            Continue with Google
                        </span>

                    </button>


                    {/* ========================================== */}
                    {/* GITHUB */}
                    {/* ========================================== */}

                    <button
                        type="button"
                        className="oauth-button"
                        onClick={handleGithubLogin}
                    >

                        <span className="github-logo">
                            GH
                        </span>

                        <span>
                            Continue with GitHub
                        </span>

                    </button>


                    {/* ========================================== */}
                    {/* REGISTER */}
                    {/* ========================================== */}

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">
                            Create account
                        </Link>

                    </p>

                </div>

            </section>

        </div>
    );
}


export default Login;