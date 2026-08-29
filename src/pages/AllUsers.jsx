import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const API_URL = import.meta.env.VITE_API_URL;


    // ==========================================
    // FETCH ALL USERS
    // ==========================================

    const fetchUsers = async () => {

        try {

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


            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }


            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.error(error);

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


            if (!response.ok) {
                throw new Error("Delete failed");
            }


            // Remove deleted user from UI
            setUsers(
                users.filter(
                    user => user.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Unable to delete user.");
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div style={styles.center}>
                <h2>Loading users...</h2>
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

                    <h1>All Users</h1>

                    <p>
                        Manage all registered users.
                    </p>

                </div>


                <button
                    onClick={() => navigate("/dashboard")}
                    style={styles.backButton}
                >
                    ← Dashboard
                </button>

            </div>


            <div style={styles.card}>

                {users.length === 0 ? (

                    <h3>No users found.</h3>

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

                                    {user.enable
                                        ? "Active"
                                        : "Inactive"}

                                </td>

                                <td style={styles.td}>

                                    {/* EDIT */}

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/users/edit/${user.id}`
                                            )
                                        }
                                        style={styles.editButton}
                                    >
                                        Edit
                                    </button>


                                    {/* DELETE */}

                                    <button
                                        onClick={() =>
                                            handleDelete(user.id)
                                        }
                                        style={styles.deleteButton}
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
        overflowX: "auto"
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
        cursor: "pointer"
    },

    editButton: {
        padding: "8px 14px",
        marginRight: "10px",
        cursor: "pointer"
    },

    deleteButton: {
        padding: "8px 14px",
        cursor: "pointer"
    },

    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    }
};

export default AllUsers;