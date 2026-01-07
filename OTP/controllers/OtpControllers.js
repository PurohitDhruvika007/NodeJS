import { transporter } from "../services/MailServices.js"
export const sendMail = async (req, res) => {
    await transporter.sendMail({
        from: `OTP services <${process.env.EMAIL}>`,
        to: "purohitdhruvika87@gmail.com",
        subject: "your OTP code",
        text: "your OTP is 123456 ,it will expires in 2 minutes."
    })
    res.json({ message: "OTP send successfully" });
}