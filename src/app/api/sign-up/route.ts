import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        // console data
        console.log(`${username}, ${email}, ${password}`);

        // Generate Verification Code
        const verifyCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // find user by username or verified : true
        const exitingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        // if user present then stop the new registeration
        if (exitingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 400 }
            );
        }
        // Find user By EMail
        const exitingUserByEmail = await UserModel.findOne({ email });

        // IF user present By Email
        if (exitingUserByEmail) {
            if (exitingUserByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exits with this email",
                    },
                    {
                        status: 400,
                    }
                );
            } else {
                const hasedPassword = await bcrypt.hash(password, 10);
                exitingUserByEmail.username = username;
                exitingUserByEmail.password = hasedPassword;
                exitingUserByEmail.verifyCode = verifyCode;
                exitingUserByEmail.verifyCodeExpiry = new Date(
                    Date.now() + 3600000
                );
                await exitingUserByEmail.save();
            }
            //
        } else {
            // NEW USER REGISTERATION PROCESS
            const hasedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hasedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            });

            await newUser.save();
        }

        // send VErification Email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                {
                    status: 500,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message:
                    "User registerated successfully. Please verify your email",
            },
            {
                status: 201,
            }
        );
        console.log("Email send to this :: ", email);
        // error
    } catch (error) {
        console.error("Error registering user :: ", error);
        return Response.json(
            {
                success: false,
                message:
                    "Error registeration user , Again try after few minutes later",
            },
            {
                status: 500,
            }
        );
    }
}
