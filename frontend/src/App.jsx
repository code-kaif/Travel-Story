import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              token ? <Navigate to="/dashboard" /> : <Navigate to={"/login"} />
            }
          ></Route>
          <Route path="/dashboard" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/signup" exact element={<Signup />}></Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default App;
