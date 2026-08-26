import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const token = localStorage.getItem("token");


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8080/api/v1/users/me",
                    {
                        method: "GET",

                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );


                if (!response.ok) {
                    throw new Error(
                        "Unable to fetch profile"
                    );
                }


                const data = await response.json();

                setUser(data);

            } catch (error) {

                console.error(error);

            }
        };


        fetchProfile();

    }, [token]);


    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={styles.back}
                >
                    ← Dashboard
                </button>


                <h1>My Profile</h1>


                {user ? (

                    <div>

                        <p>
                            <strong>Name:</strong>{" "}
                            {user.name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {user.email}
                        </p>

                        <p>
                            <strong>Gender:</strong>{" "}
                            {user.gender || "-"}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {user.enable
                                ? "Active"
                                : "Inactive"}
                        </p>

                    </div>

                ) : (

                    <p>Loading profile...</p>

                )}

            </div>

        </div>
    );
};


const styles = {

    page: {
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "50px",
        fontFamily: "Arial, sans-serif"
    },

    card: {
        maxWidth: "600px",
        margin: "auto",
        background: "white",
        padding: "35px",
        borderRadius: "12px"
    },

    back: {
        padding: "8px 15px",
        marginBottom: "20px",
        cursor: "pointer"
    }
};

export default Profile;