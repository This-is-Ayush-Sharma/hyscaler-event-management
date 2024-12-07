const {sendBulkEmailsNotification} = require("../config/mailer.config");
const Event = require('../model/event');

exports.sendNotification = async (req, res) => {
    try{
        const { subject, message, event } = req.body;

        const recipients = [];
        const registrationData =  await Event.find({_id: event}).populate({
            path: 'registrations',
            populate: { path: 'user', select: 'email' },
        });

        // console.log(registrationData);

        registrationData?.map((register) => {
            // console.log(register);
            register?.registrations?.map((deatils) => {
                recipients.push(deatils.user.email);
            })
        });

        sendBulkEmailsNotification(recipients, subject, message);

        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({error: error})
    }
};