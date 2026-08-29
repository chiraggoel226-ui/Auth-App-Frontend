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

            const response = await api.post(
                "/api/v1/auth/login",
                {
                    email,
                    password
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
            // CHECK JWT
            // ==========================================

            const token = response.data?.token;


            if (!token) {

                console.error(
                    "No JWT token received from backend."
                );

                setError(
                    "Login failed. Server did not return an authentication token."
                );

                return;
            }


            // ==========================================
            // CLEAR OLD AUTH DATA
            // ==========================================

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");


            // ==========================================
            // SAVE TOKEN
            // ==========================================
            // IMPORTANT:
            // AllUsers.jsx also reads from localStorage
            // ==========================================

            localStorage.setItem(
                "token",
                token
            );


            // ==========================================
            // SAVE USER
            // ==========================================

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


            console.log(
                "JWT saved successfully."
            );


            // ==========================================
            // DASHBOARD
            // ==========================================

            navigate("/dashboard");


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            // ==========================================
            // BACKEND RESPONSE ERROR
            // ==========================================

            if (err.response) {

                console.error(
                    "STATUS:",
                    err.response.status
                );

                console.error(
                    "ERROR RESPONSE:",
                    err.response.data
                );


                setError(
                    err.response.data?.message ||
                    "Invalid email or password."
                );

            } else {

                setError(
                    "Cannot connect to server. Make sure the backend is running."
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

        window.location.href =
            `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
    };


    // ==========================================
    // GITHUB LOGIN
    // ==========================================

    const handleGithubLogin = () => {

        window.location.href =
            `${import.meta.env.VITE_API_URL}/oauth2/authorization/github`;
    };


    return (

        <div className="login-page">

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


                    {error && (

                        <div className="message error-message">
                            {error}
                        </div>

                    )}


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


                    {/* DIVIDER */}

                    <div className="divider">

                        <span>
                            OR CONTINUE WITH
                        </span>

                    </div>


                    {/* GOOGLE */}

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


                    {/* GITHUB */}

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


                    {/* REGISTER */}

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