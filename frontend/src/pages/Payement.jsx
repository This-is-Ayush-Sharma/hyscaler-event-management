import React, { useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "../apis/postAPI";
import { CheckToken } from "../middleware/checkToken";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51QT09uFNKjXm5CyraXNQ7NbW7cbDbWoHYwRGuhDPwiosikMK0oRS43nhjnacPfKHrHwlOEkawRaUq18syG3zZPEM00ZFDmR4cr"
);

const CheckOutForm = ({ formData }) => {
  const navigate = useNavigate();
  const token = CheckToken();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      return console.log("Error", error);
    }

    if (paymentIntent.status === "succeeded") {
      // Handle successful payment
      console.log("FormData", formData);
      try {
        const response = await register.registerEvent(token, formData);
        if (response === 201) {
          toast.success("Payment Successfull");
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Error in API", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg w-full md:w-1/2 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Complete Your Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement className="bg-gray-100 p-4 rounded-lg" />
        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg rounded-lg hover:bg-blue-600">
          Pay Now
        </button>
      </form>
    </div>
  );
};

const Payement = () => {
  const location = useLocation();
  const client_secret = location.state.clientSecret;
  const formData = location.state.formData;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Elements
        options={{
          clientSecret: client_secret,
        }}
        stripe={stripePromise}>
        <CheckOutForm formData={formData} />
      </Elements>
    </div>
  );
};

export default Payement;
