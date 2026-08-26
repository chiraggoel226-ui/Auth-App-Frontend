import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OAuth2Success from "./pages/OAuth2Success";

import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";
import Profile from "./pages/Profile";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* OAUTH2 SUCCESS */}
                <Route
                    path="/oauth2/success"
                    element={<OAuth2Success />}
                />


                {/* ALL USERS */}
                <Route
                    path="/users"
                    element={<AllUsers />}
                />


                {/* ADD USER */}
                <Route
                    path="/users/add"
                    element={<AddUser />}
                />


                {/* PROFILE */}
                <Route
                    path="/profile"
                    element={<Profile />}
                />


                {/* DEFAULT */}
                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;