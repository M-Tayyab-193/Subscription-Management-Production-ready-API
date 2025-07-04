import  transporter, { accountEmail } from "../config/nodemailer.js";
import { emailTemplates } from "./email-template.js";
import dayjs from "dayjs";

export const sendReminder = async ({to, type, subscription})=>{
    if(!to || !type || !subscription) {
        throw new Error("Missing required parameters");
    }
    const template = emailTemplates.find((t)=> t.label === type);
    if(!template) {
        throw new Error("Invalid email type");
    }
    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod
    }
    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};