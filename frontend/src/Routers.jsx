import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./DashboardLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Validtor from "./middleware/Validtor";
import Payement from "./pages/Payement";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <Validtor>
              <DashboardLayout />
            </Validtor>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
