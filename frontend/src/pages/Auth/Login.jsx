import React, { useState } from "react";
import { CheckToken } from "../../middleware/checkToken";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../apis/postAPI";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const token = CheckToken();
  if (token) {
    return <Navigate to={"/dashboard"} />;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
    // Add Google Sign-In logic here
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = "";
    // console.log(formData);
    try {
      const response = await auth.login(formData);
      console.log("Response", response.data.message);
      if (response.status === 200) {
        message = "Logged In";
        toast.success(message);
        localStorage.setItem("token", response.data);
        navigate("/dashboard");
      } else {
        message = response.data.message;
        toast.error(message);
      }
    } catch (error) {}
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
