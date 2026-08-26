import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth2Success() {

    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const [error, setError] =
        useState("");


    useEffect(() => {

        const token =
            searchParams.get("token");


        if (!token) {

            setError(
                "OAuth login failed. Token not received."
            );

            return;
        }


        console.log(
            "OAuth JWT received:",
            token
        );


        // ==========================================
        // SAVE JWT
        // ==========================================

        sessionStorage.setItem(
            "token",
            token
        );


        // ==========================================
        // GO TO DASHBOARD
        // ==========================================

        navigate(
            "/dashboard",
            {
                replace: true
            }
        );

    }, [navigate, searchParams]);


    if (error) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    flexDirection: "column"
                }}
            >

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
                >
                    Back to Login
                </button>

            </div>
        );
    }


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column"
            }}
        >

            <h2>
                Login Successful
            </h2>

            <p>
                Redirecting to dashboard...
            </p>

        </div>
    );
}

export default OAuth2Success;