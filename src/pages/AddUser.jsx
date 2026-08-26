import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        gender: ""

    });


    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);


        try {

            const response = await fetch(
                "http://localhost:8080/api/v1/users",
                {
                    method: "POST",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to create user"
                );
            }


            alert("User created successfully!");

            navigate("/users");


        } catch (error) {

            console.error(error);

            alert("Failed to create user.");

        } finally {

            setLoading(false);
        }
    };


    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <button
                    onClick={() => navigate("/dashboard")}
                    style={styles.back}
                >
                    ← Dashboard
                </button>


                <h1>Add User</h1>

                <p>Create a new user.</p>


                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />


                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        style={styles.input}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="MALE">
                            Male
                        </option>

                        <option value="FEMALE">
                            Female
                        </option>

                        <option value="OTHER">
                            Other
                        </option>

                    </select>


                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading
                            ? "Creating..."
                            : "Create User"}
                    </button>

                </form>

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
        maxWidth: "500px",
        margin: "auto",
        background: "white",
        padding: "35px",
        borderRadius: "12px"
    },

    back: {
        padding: "8px 15px",
        marginBottom: "20px",
        cursor: "pointer"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        boxSizing: "border-box",
        fontSize: "16px"
    },

    button: {
        width: "100%",
        padding: "13px",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default AddUser;