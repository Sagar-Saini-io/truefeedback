import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                // email: { label: "Email", type: "text" },
                identifier: { label: "Email", type: "text" },

                password: { label: "Password", type: "password" },
            },
            //
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier }, // credentials.identifier.email
                            { username: credentials.identifier },
                        ],
                    });
                    // USER NOT FOUND
                    if (!user) {
                        throw new Error(
                            "No user found with this email or username"
                        );
                    }
                    //
                    if (!user.isVerified) {
                        throw new Error(
                            "Please verify your account before login"
                        );
                    }
                    //
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    //
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect Password");
                    }
                    //
                    //
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session;
        },
    },

    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
