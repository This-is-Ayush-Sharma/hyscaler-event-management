import React, { useState } from "react";
import { auth } from "../../apis/postAPI";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { CheckToken } from "../../middleware/checkToken";

const Register = () => {
  const token = CheckToken();
  const navigate = useNavigate();
  const [ show, setShow ] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    account_type: "organiser",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const passwordHandler = (e) => {
    // toggle show 
    setShow(!show);
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    try {
      // check for valid email and password

      if(!formData.email.endsWith("@gmail.com")){
        toast.error("We can only use gmail to register!");
        return;
      }
      
      //password validation
        // check for digits
        // check for spec
        // check alph

      if(formData.password.length < 6){
        toast.error("Password should be of 6 characters");
        return;
      }
      


      let dig = 0, alpha = 0, spec = 0;
      for(let i = 0; i < formData.password.length; i++){
        // console.log(formData.password.charAt(i).toString().charCodeAt(0))
        if((formData.password.charCodeAt(i) >= 97 && formData.password.charCodeAt(i) <= 122)  || (formData.password.charCodeAt(i) >= 65 && formData.password.charCodeAt(i) <= 90)){
          alpha++;
        }
        else if(formData.password.charCodeAt(i) >= 48 && formData.password.charCodeAt(i) <= 57){
          dig++;
        }
        else{
          spec++;
        }
      }
      // console.log(dig, alpha, spec);

      if(dig == 0){
        toast.error("Password should have digits in it");
        return;
      }
      if(alpha == 0){
        toast.error("Password should have alphabets in it");
        return;
      }
      if(spec == 0){
        toast.error("Password should have special character in it");
        return;
      }


      const response = await auth.register(formData);
      console.log("Response", response);
      if (response.status === 201) {
        toast.success("User Registered");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error in api", error);
    }
  };


  if (token) return <Navigate to={"/dashboard"} />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {/* <form className="space-y-4" onSubmit={handleSubmit}> */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3"
              placeholder="Enter your name"
            />
          </div>
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
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3"
              placeholder="Enter your Phone Number"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3"
              placeholder="Enter your Password"
            />
            <button onClick={passwordHandler}>
              {show ? "hide" : "show"}
            </button> 
              
          </div>
          <div>
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              id="accountType"
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-3">
              <option value="organiser">Organiser</option>
              <option value="attendee">Attendee</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </div>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
