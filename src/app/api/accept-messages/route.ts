import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated !",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user?._id;

    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                isAcceptingMessage: acceptMessages,
            },
            { new: true }
        );
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message:
                        "failed to update user status to accecpt messages !",
                },
                {
                    status: 401,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptence status updated successfully !",
                updatedUser,
            },
            {
                status: 200,
            }
        );

        //
    } catch (error) {
        console.log(
            "catch :: failed to update user status to accecpt messages"
        );
        return Response.json(
            {
                success: false,
                message:
                    "catch :: failed to update user status to accecpt messages !",
            },
            {
                status: 500,
            }
        );
    }

    //
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated !",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user?._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            return Response.json(
                {
                    success: false,
                    message: "User Not Found !",
                },
                {
                    status: 404,
                }
            );
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessage: foundUser.isAcceptingMessage,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error getting message acceptence status");
        return Response.json(
            {
                success: false,
                message: "Error getting message acceptence status !",
            },
            {
                status: 500,
            }
        );
    }
}
