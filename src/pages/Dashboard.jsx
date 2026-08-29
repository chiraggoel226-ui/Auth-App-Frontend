import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();


    // ==========================================
    // GET JWT TOKEN
    // ==========================================

    const token = localStorage.getItem("token");


    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    const storedUser = localStorage.getItem("user");

    let user = null;

    try {

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {

        console.error(
            "Invalid user data in localStorage:",
            error
        );

        user = null;
    }


    // ==========================================
    // GET USER NAME
    // ==========================================

    const userName =
        user?.name ||
        user?.email ||
        "User";


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        sessionStorage.clear();

        navigate(
            "/login",
            {
                replace: true
            }
        );
    };


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    const handleProtectedNavigation = (path) => {

        const currentToken =
            localStorage.getItem("token");

        if (!currentToken) {

            navigate(
                "/login",
                {
                    replace: true
                }
            );

            return;
        }

        navigate(path);
    };


    return (

        <div style={styles.page}>


            {/* ==========================================
                HEADER
            ========================================== */}

            <div style={styles.header}>

                <div>

                    <h1 style={styles.title}>

                        Hello, {userName} 👋

                    </h1>


                    <p style={styles.subtitle}>

                        You are logged in successfully.

                    </p>

                </div>


                {/* ==========================================
                    LOGOUT
                ========================================== */}

                <button
                    type="button"
                    onClick={handleLogout}
                    style={styles.logoutButton}
                >

                    Logout

                </button>

            </div>


            {/* ==========================================
                USER MANAGEMENT
            ========================================== */}

            <div style={styles.container}>

                <h2 style={styles.heading}>

                    User Management

                </h2>


                <p style={styles.description}>

                    Choose an action below to manage users.

                </p>


                <div style={styles.buttonGrid}>


                    {/* ==========================================
                        ADD USER
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            handleProtectedNavigation(
                                "/users/add"
                            )
                        }
                        style={styles.actionButton}
                    >

                        <span style={styles.icon}>
                            ＋
                        </span>


                        <div>

                            <strong style={styles.actionTitle}>
                                Add User
                            </strong>


                            <small style={styles.smallText}>
                                Create a new user
                            </small>

                        </div>

                    </button>


                    {/* ==========================================
                        ALL USERS
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            handleProtectedNavigation(
                                "/users"
                            )
                        }
                        style={styles.actionButton}
                    >

                        <span style={styles.icon}>
                            👥
                        </span>


                        <div>

                            <strong style={styles.actionTitle}>
                                All Users
                            </strong>


                            <small style={styles.smallText}>
                                View all users
                            </small>

                        </div>

                    </button>


                    {/* ==========================================
                        MY PROFILE
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            handleProtectedNavigation(
                                "/profile"
                            )
                        }
                        style={styles.actionButton}
                    >

                        <span style={styles.icon}>
                            👤
                        </span>


                        <div>

                            <strong style={styles.actionTitle}>
                                My Profile
                            </strong>


                            <small style={styles.smallText}>
                                View your profile
                            </small>

                        </div>

                    </button>

                </div>

            </div>

        </div>
    );
};


// ==========================================
// STYLES
// ==========================================

const styles = {

    page: {

        minHeight: "100vh",

        backgroundColor: "#f5f7fb",

        padding: "40px",

        boxSizing: "border-box",

        fontFamily: "Arial, sans-serif",
    },


    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "50px",
    },


    title: {

        margin: 0,

        fontSize: "38px",

        color: "#172554",
    },


    subtitle: {

        marginTop: "10px",

        fontSize: "18px",

        color: "#475569",
    },


    logoutButton: {

        padding: "12px 25px",

        fontSize: "16px",

        border: "1px solid #999",

        borderRadius: "6px",

        backgroundColor: "white",

        cursor: "pointer",
    },


    container: {

        maxWidth: "1000px",

        margin: "0 auto",

        backgroundColor: "white",

        padding: "40px",

        borderRadius: "15px",

        boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
    },


    heading: {

        marginTop: 0,

        fontSize: "28px",

        color: "#172554",
    },


    description: {

        color: "#64748b",

        marginBottom: "30px",
    },


    buttonGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",

        gap: "20px",
    },


    actionButton: {

        display: "flex",

        alignItems: "center",

        gap: "18px",

        padding: "25px",

        backgroundColor: "#ffffff",

        border: "1px solid #dbe2ea",

        borderRadius: "10px",

        cursor: "pointer",

        textAlign: "left",

        fontSize: "18px",

        transition: "0.2s",

    },


    actionTitle: {

        display: "block",

        fontSize: "20px",
    },


    icon: {

        fontSize: "30px",
    },


    smallText: {

        display: "block",

        marginTop: "6px",

        fontSize: "14px",

        color: "#64748b",
    },
};


export default Dashboard;