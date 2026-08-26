import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import {
    ShieldCheck,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        gender: ""
    });


    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
        setSuccess("");
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);


        try {

            const response = await api.post(
                "/api/v1/auth/register",
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    gender: formData.gender
                }
            );


            console.log(
                "Registration successful:",
                response.data
            );


            setSuccess(
                "Account created successfully! 🎉"
            );


            setTimeout(() => {
                navigate("/");
            }, 1500);


        } catch (err) {

            console.error(
                "Registration error:",
                err
            );


            if (err.response) {

                setError(
                    err.response.data?.message ||
                    "Registration failed. Please check your details."
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


    return (

        <div className="register-page">

            <section className="register-left">

                <div className="register-logo">

                    <div className="register-logo-icon">
                        <ShieldCheck size={25} />
                    </div>

                    <span>
                        AuthHub
                    </span>

                </div>


                <div className="register-hero">

                    <p className="small-heading">
                        JOIN AUTHHUB
                    </p>


                    <h1>

                        Create your

                        <br />

                        <span>
                            secure account.
                        </span>

                    </h1>


                    <p>
                        Get started with secure
                        authentication and powerful
                        user management.
                    </p>

                </div>


                <p className="register-copyright">
                    © 2026 AuthHub.
                    All rights reserved.
                </p>

            </section>


            <section className="register-right">

                <div className="register-box">

                    <div className="register-mobile-logo">
                        <ShieldCheck size={25} />
                    </div>


                    <h2>
                        Create account
                    </h2>


                    <p className="register-subtitle">
                        Fill in your details to get started.
                    </p>


                    {error && (

                        <div className="message error-message">
                            {error}
                        </div>

                    )}


                    {success && (

                        <div className="message success-message">
                            {success}
                        </div>

                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="register-form-group">

                            <label>
                                Full name
                            </label>

                            <div className="register-input">

                                <User size={19} />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-form-group">

                            <label>
                                Email address
                            </label>

                            <div className="register-input">

                                <Mail size={19} />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="register-form-group">

                            <label>
                                Password
                            </label>

                            <div className="register-input">

                                <Lock size={19} />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />


                                <button
                                    type="button"
                                    className="register-eye"
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


                        <div className="register-form-group">

                            <label>
                                Gender
                            </label>

                            <div className="register-input">

                                <User size={19} />

                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading ? (

                                "Creating account..."

                            ) : (

                                <>
                                    Create account
                                    <ArrowRight size={19} />
                                </>

                            )}

                        </button>

                    </form>


                    <p className="already-account">

                        Already have an account?

                        <Link to="/">
                            Sign in
                        </Link>

                    </p>

                </div>

            </section>

        </div>
    );
}

export default Register;