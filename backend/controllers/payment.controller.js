
// import { stripe } from "../index.js";
// import Request from "../models/requestRide.model.js";
// import { ObjectId } from "mongoose";

const stripe = require('stripe')(process.env.STRIP_SECRET);

exports.paymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                sucess: false,
                message: "Amount is not given",
            });
        }

        // Uncomment for RBI guidelines
        // const customer = await stripe.customers.create({
        //   name: description.name,
        //   address: {
        //     line1: description.name,
        //     city: description.city,
        //     state: description.state,
        //     postal_code: description.pincode,
        //     country: description.country,
        //   },
        // });

        // const paymentDescription = `Purchase by ${description.name}, Address: ${description.address}, ${description.city}, ${description.state}, ${description.country} - ${description.pincode}`;
        const parsedAmount = Math.round(Number(amount) * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parsedAmount,
            currency: "usd",
            payment_method_types: ["card"],
            // description: paymentDescription,
            // customer: customer.id
        });

        return res.status(201).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
