import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // await resend.emails.send({
        //     from: "Acme <onboarding@resend.dev>",
        //     to: email,
        //     subject: "Verification Code",
        //     react: VerificationEmail({ username, otp: verifyCode }), // component render ex: email Template
        // });

        // Looking to send emails in production? Check out our Email API/SMTP product!
        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "",
        //         pass: "",
        //     },
        // });
        var transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.Gmail_USER,
                pass: process.env.Gmail_PAss,
            },
        });
        const mailOption = {
            from: "test@test.ai", // sender address
            to: email, // list of receivers
            subject: "Verify Your email",
            // text: "Hello world?", // plain text body
            html: await render(
                VerificationEmail({
                    username: `${username}`,
                    otp: `${verifyCode}`,
                })
            ),
        };

        const mailResponse = await transport.sendMail(mailOption);
        // return mailResponse;
        return {
            success: true,
            message: "verification email send successfully",
            MailResponse: mailResponse,
        };

        //
    } catch (emailError) {
        console.error("Error sending verification email : ", emailError);
        return { success: false, message: "Failed to send verification email" };
    }
}
