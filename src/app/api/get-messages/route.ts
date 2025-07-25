import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import mongoose from "mongoose";

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
    const userId = new mongoose.Types.ObjectId(user?._id);

    try {
        const userMessages = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            { $group: { _id: "$_id", messages: { $push: "$messages" } } },
        ]);

        // console.log("Get-message user :: ", userMessages[0].messages);

        if (!userMessages || userMessages.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User Not Found OR You did't have any message",
                },
                {
                    status: 401,
                }
            );
        }
        return Response.json(
            {
                success: true,
                messages: userMessages[0].messages,
            },
            {
                status: 200,
            }
        );
        //
    } catch (error) {
        console.log("Catch Error During Getting messages :: ", error);
        return Response.json(
            {
                success: false,
                message: "Catch Error During Getting messages",
            },
            {
                status: 500,
            }
        );
    }
    //
}
