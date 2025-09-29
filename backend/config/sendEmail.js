import { sendEmail}  from "./emailServices.js";

const sendEmailFun = async ({ to, subject, text, html }) => {
    const result = await sendEmail(to, subject, text, html);
    if (result.success) {
        return true;
    } else {
        console.error("Email send failed:", result.error);
        return false;
    }
};

export default sendEmailFun;