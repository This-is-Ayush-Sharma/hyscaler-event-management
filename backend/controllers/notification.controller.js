const {sendBulkEmailsNotification} = require("../config/mailer.config");
exports.sendNotification = async (req, res) => {
    try{
        const { recipients, subject, message } = req.body;

        sendBulkEmailsNotification(recipients, subject, message);

        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({error: error})
    }
};