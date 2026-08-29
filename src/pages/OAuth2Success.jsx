import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OAuth2Success() {

    const navigate = useNavigate();

    const [error, setError] = useState("");


    useEffect(() => {

        try {

            // ==========================================
            // GET TOKEN FROM URL
            // ==========================================

            const params =
                new URLSearchParams(
                    window.location.search
                );

            const token =
                params.get("token");


            console.log(
                "OAuth token:",
                token
            );


            // ==========================================
            // TOKEN CHECK
            // ==========================================

            if (!token) {

                console.error(
                    "OAuth login failed: token missing"
                );

                setError(
                    "OAuth login failed. Token not received."
                );

                return;
            }


            // ==========================================
            // SAVE TOKEN
            // ==========================================

            localStorage.setItem(
                "token",
                token
            );


            // ==========================================
            // VERIFY
            // ==========================================

            const savedToken =
                localStorage.getItem("token");


            console.log(
                "JWT saved:",
                savedToken
            );


            if (!savedToken) {

                setError(
                    "Unable to save authentication token."
                );

                return;
            }


            // ==========================================
            // REMOVE TOKEN FROM URL
            // ==========================================

            window.history.replaceState(
                {},
                document.title,
                "/oauth2/success"
            );


            // ==========================================
            // GO DASHBOARD
            // ==========================================

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );

        } catch (err) {

            console.error(
                "OAuth success error:",
                err
            );

            setError(
                "Something went wrong during OAuth login."
            );
        }

    }, [navigate]);


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (

            <div style={styles.page}>

                <div style={styles.box}>

                    <h2>
                        Login Failed
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/login")
                        }
                        style={styles.button}
                    >
                        Back to Login
                    </button>

                </div>

            </div>
        );
    }


    // ==========================================
    // LOADING
    // ==========================================

    return (

        <div style={styles.page}>

            <div style={styles.box}>

                <h2>
                    Login Successful ✓
                </h2>

                <p>
                    Redirecting to dashboard...
                </p>

            </div>

        </div>
    );
}


const styles = {

    page: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
    },

    box: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    },

    button: {
        marginTop: "20px",
        padding: "12px 25px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#312e81",
        color: "white",
        cursor: "pointer",
        fontSize: "16px",
    },
};


export default OAuth2Success;