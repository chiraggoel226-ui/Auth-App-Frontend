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

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


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
                "LOGIN RESPONSE:",
                response.data
            );


            // JWT SAVE
            sessionStorage.setItem(
                "token",
                response.data.token
            );


            // USER SAVE
            sessionStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


            // DASHBOARD
            navigate("/dashboard");


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            if (err.response) {

                setError(
                    err.response.data?.message ||
                    "Invalid email or password."
                );

            } else {

                setError(
                    "Cannot connect to server. Make sure Spring Boot is running."
                );
            }


        } finally {

            setLoading(false);

        }
    };


    const handleGoogleLogin = () => {

        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";

    };


    const handleGithubLogin = () => {

        window.location.href =
            "http://localhost:8080/oauth2/authorization/github";

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


                    <div className="divider">
                        <span>
                            OR CONTINUE WITH
                        </span>
                    </div>


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