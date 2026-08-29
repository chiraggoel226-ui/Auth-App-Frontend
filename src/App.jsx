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

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/oauth2/success"
                    element={<OAuth2Success />}
                />

                <Route
                    path="/users"
                    element={<AllUsers />}
                />

                <Route
                    path="/users/add"
                    element={<AddUser />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;