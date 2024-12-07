const User = require('../model/user');
const bcrypt = require('bcrypt');
const { sendOtp } = require("../config/mailer.config");
const jwt = require("jsonwebtoken");
const Event = require('../model/event');
// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, account_type, password } = req.body;
        // hash password and store in db
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, phoneNumber, account_type, password: hashedPassword });
        // after the user is created send email for validation and status update
        const url = req.protocol + '://' + req.get('host') + "/users/" + user._id;

        sendOtp(email, "Here is your Link is", url, user);

        // res.status(200).send({});
        res.status(201).json({ user, message: "user created successfully." });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// verify user account
exports.verifyAccount = async (req, res) => {
    try{
        const uid = req.params.uid;
        const user = await User.findById(uid);
        if (!user) {
            res.status(404).json({ "message" : "User not found" });
        }
        user.status = "active";
        await user.save();
        res.status(200).json({ "message": "Account verified" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({ "message" : "Email/Password is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ "message" : "User not found" });
        }

        const jwtToken = await jwt.sign({
            email: user.email,
            _id: user._id,
            account_type: user.account_type,
            name: user.name,
        }, process.env.JWT_SECRET);


        res.status(200).json(jwtToken);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// fetch attendies for event
exports.eventAttendees = async (req, res) => {
    try{
        const user = req.user._id;
        const event = await Event.find({ user: user }).populate({
            path: 'registrations',
            populate: { path: 'user', select: 'name email' }, // Include user details in registrations
        });
        // console.log(event);
        res.status(200).json(event);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}