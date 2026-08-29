import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");


    // ==========================================
    // FETCH ALL USERS
    // ==========================================

    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            console.log("=================================");
            console.log("API URL:", API_URL);
            console.log("FULL URL:", `${API_URL}/api/v1/users`);
            console.log("TOKEN:", token);
            console.log("=================================");


            // No token
            if (!token) {

                setError("You are not logged in. Please login again.");

                setLoading(false);

                return;
            }


            const response = await fetch(
                `${API_URL}/api/v1/users`,
                {
                    method: "GET",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );


            console.log("STATUS:", response.status);
            console.log("STATUS TEXT:", response.statusText);


            // ==========================================
            // READ RESPONSE AS TEXT FIRST
            // ==========================================

            const text = await response.text();

            console.log("SERVER RESPONSE:", text);


            // ==========================================
            // CHECK RESPONSE
            // ==========================================

            if (!response.ok) {

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    setError(
                        "Authentication failed. Please login again."
                    );

                } else {

                    setError(
                        `Failed to fetch users. Status: ${response.status}`
                    );
                }

                return;
            }


            // ==========================================
            // CHECK IF RESPONSE IS HTML
            // ==========================================

            if (
                text.trim().startsWith("<!DOCTYPE") ||
                text.trim().startsWith("<html")
            ) {

                setError(
                    "Server returned the login page instead of user data. Your JWT authentication may not be working."
                );

                return;
            }


            // ==========================================
            // CONVERT RESPONSE TO JSON
            // ==========================================

            let data;

            try {

                data = JSON.parse(text);

            } catch (jsonError) {

                console.error(
                    "JSON PARSE ERROR:",
                    jsonError
                );

                setError(
                    "Server returned invalid data."
                );

                return;
            }


            console.log("USERS DATA:", data);


            // ==========================================
            // HANDLE ARRAY RESPONSE
            // ==========================================

            if (Array.isArray(data)) {

                setUsers(data);

            }

                // ==========================================
                // HANDLE PAGINATED RESPONSE
            // ==========================================

            else if (Array.isArray(data.content)) {

                setUsers(data.content);

            }

                // ==========================================
                // INVALID RESPONSE FORMAT
            // ==========================================

            else {

                console.error(
                    "Unexpected response format:",
                    data
                );

                setError(
                    "Unexpected response received from server."
                );
            }


        } catch (error) {

            console.error(
                "FETCH USERS ERROR:",
                error
            );

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // LOAD USERS
    // ==========================================

    useEffect(() => {

        fetchUsers();

    }, []);


    // ==========================================
    // DELETE USER
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/v1/users/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );


            console.log(
                "DELETE STATUS:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    `Delete failed: ${response.status}`
                );
            }


            // Remove deleted user from UI

            setUsers(
                users.filter(
                    user => user.id !== id
                )
            );


        } catch (error) {

            console.error(
                "DELETE ERROR:",
                error
            );

            alert(
                "Unable to delete user."
            );
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div style={styles.center}>

                <h2>
                    Loading users...
                </h2>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div style={styles.page}>

                <div style={styles.errorCard}>

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>


                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        style={styles.backButton}
                    >
                        ← Dashboard
                    </button>


                    <button
                        onClick={fetchUsers}
                        style={styles.retryButton}
                    >
                        Retry
                    </button>

                </div>

            </div>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div style={styles.page}>

            <div style={styles.header}>

                <div>

                    <h1>
                        All Users
                    </h1>

                    <p>
                        Manage all registered users.
                    </p>

                </div>


                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    style={styles.backButton}
                >
                    ← Dashboard
                </button>

            </div>


            <div style={styles.card}>

                {users.length === 0 ? (

                    <div style={styles.empty}>

                        <h3>
                            No users found.
                        </h3>

                        <p>
                            There are currently no users
                            available.
                        </p>

                    </div>

                ) : (

                    <table style={styles.table}>

                        <thead>

                        <tr>

                            <th style={styles.th}>
                                Name
                            </th>

                            <th style={styles.th}>
                                Email
                            </th>

                            <th style={styles.th}>
                                Gender
                            </th>

                            <th style={styles.th}>
                                Status
                            </th>

                            <th style={styles.th}>
                                Actions
                            </th>

                        </tr>

                        </thead>


                        <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td style={styles.td}>
                                    {user.name || "-"}
                                </td>

                                <td style={styles.td}>
                                    {user.email || "-"}
                                </td>

                                <td style={styles.td}>
                                    {user.gender || "-"}
                                </td>

                                <td style={styles.td}>

                                        <span
                                            style={
                                                user.enable
                                                    ? styles.active
                                                    : styles.inactive
                                            }
                                        >
                                            {user.enable
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                </td>

                                <td style={styles.td}>

                                    {/* EDIT */}

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/users/edit/${user.id}`
                                            )
                                        }
                                        style={
                                            styles.editButton
                                        }
                                    >
                                        Edit
                                    </button>


                                    {/* DELETE */}

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                user.id
                                            )
                                        }
                                        style={
                                            styles.deleteButton
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                )}

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
        background: "#f5f7fb",
        padding: "40px",
        fontFamily: "Arial, sans-serif"
    },


    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },


    card: {
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        overflowX: "auto",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
    },


    table: {
        width: "100%",
        borderCollapse: "collapse"
    },


    th: {
        textAlign: "left",
        padding: "15px",
        borderBottom: "2px solid #ddd"
    },


    td: {
        padding: "15px",
        borderBottom: "1px solid #eee"
    },


    backButton: {
        padding: "10px 18px",
        cursor: "pointer",
        border: "none",
        borderRadius: "6px",
        background: "#333",
        color: "white"
    },


    editButton: {
        padding: "8px 14px",
        marginRight: "10px",
        cursor: "pointer",
        border: "none",
        borderRadius: "6px",
        background: "#2563eb",
        color: "white"
    },


    deleteButton: {
        padding: "8px 14px",
        cursor: "pointer",
        border: "none",
        borderRadius: "6px",
        background: "#dc2626",
        color: "white"
    },


    retryButton: {
        padding: "10px 18px",
        cursor: "pointer",
        border: "none",
        borderRadius: "6px",
        background: "#2563eb",
        color: "white",
        marginLeft: "10px"
    },


    active: {
        color: "green",
        fontWeight: "bold"
    },


    inactive: {
        color: "red",
        fontWeight: "bold"
    },


    empty: {
        textAlign: "center",
        padding: "40px"
    },


    errorCard: {
        background: "white",
        maxWidth: "600px",
        margin: "100px auto",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
    },


    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    }
};


export default AllUsers;