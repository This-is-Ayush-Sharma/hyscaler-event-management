const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,               // Port for TLS
    secure: true,           // false for TLS, true for SSL
    auth: {
        user: "thisisayush79@gmail.com",    // Your Gmail address
        pass: "dmri sdrg dyti ekmo",
    }
});


// Function to send an email to a single recipient
const sendSingleEmailConfirmation = async (to, subject, eventDetails) => {
    try {
        const info = await transporter.sendMail({
            from: '"Ayush Sharma" thisisayush79@gmail.com', // Sender address
            to,                                          // Recipient's email
            subject,                                     // Subject line
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">🎉 Registration Confirmation 🎉</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for registering for the event. Here are your event details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                    <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Event Name</th>
                    <td style="padding: 8px;">${eventDetails.name}</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Location</th>
                    <td style="padding: 8px;">${eventDetails.location}</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Start Date</th>
                    <td style="padding: 8px;">${eventDetails.startDate}</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">End Date</th>
                    <td style="padding: 8px;">${eventDetails.endDate}</td>
                </tr>
                <tr>
                    <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Description</th>
                    <td style="padding: 8px;">${eventDetails.description}</td>
                </tr>
            </table>
            
            <p style="margin-top: 20px;">We look forward to welcoming you to the event. Please bring this email with you for entry.</p>
            <p>Best regards,</p>
            <p><strong>The Event Team</strong></p>
            
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #555;">
                <p>&copy; 2024 Event Management System. All rights reserved.</p>
                <p>If you have any questions, contact us at <a href="mailto:thisisayush79@gmail.com">thisisayush79@gmail.com</a>.</p>
            </footer>
        </div>`,                          // HTML body content
        });

        // console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};

// Function to send emails to multiple recipients
const sendBulkEmailsNotification = async (recipients, subject, message) => {
    try {
        const promises = recipients.map((to) =>
            transporter.sendMail({
                from: '"Ayush Sharma" thisisayush79@gmail.com', // Sender address
                to,                                          // Recipient's email
                subject,                                     // Subject line
                html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">📢 Notification</h2>
            <p>Hello,</p>
            <p>${message}</p>
            <p style="margin-top: 20px;">If you have any questions, feel free to contact us.</p>
            <p>Best regards,</p>
            <p><strong>Your Team</strong></p>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #555;">
                <p>&copy; 2024 Notification System. All rights reserved.</p>
                <p>If you have any issues, contact us at <a href="mailto:thisisayush79@gmail.com">thisisayush79@gmail.com</a>.</p>
            </footer>
        </div>`,                          // HTML body content
            })
        );

        const results = await Promise.all(promises);

        results.forEach((info, index) =>
            console.log(`Email sent to ${recipients[index]}: ${info.messageId}`)
        );
    } catch (error) {
        console.error(`Error sending bulk emails: ${error}`);
    }
};

// Function to send an email to a single recipient
const sendOtp = async (to, subject, url, user) => {
    try {
        const info = await transporter.sendMail({
            from: '"Ayush Sharma" thisisayush79@gmail.com', // Sender address
            to,                                          // Recipient's email
            subject,                                     // Subject line
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">🔑 Your Link Is</h2>
            <p>Dear <strong>${user.name}</strong>,</p>
            <p>Thank you for initiating a request. Your Link (One-Time Link) is:</p>
            <div style="text-align: center; margin: 20px 0; padding: 10px; border: 1px dashed #4CAF50; font-size: 20px; font-weight: bold; color: #4CAF50;">
                ${url}
            </div>
            <p>This Link is valid for <strong>5 minutes</strong>. Please do not share it with anyone for security reasons.</p>
            <p>If you did not request this, please contact our team immediately.</p>
            <p>Best regards,</p>
            <p><strong>Your Team</strong></p>
            <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #555;">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <p>If you have any issues, contact us at <a href="mailto:thisisayush79@gmail.com">thisisayush79@gmail.com</a>.</p>
            </footer>
        </div>`,                          // HTML body content
        });

        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email: ${error}`);
    }
};

module.exports = {
  sendSingleEmailConfirmation,
  sendBulkEmailsNotification,
  sendOtp
};