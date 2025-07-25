import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
//

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { messageid: string } }
// ) {
//     const { messageid } = params;
export async function DELETE(request: NextRequest) {
    const { messageid } = await request.json();
    // ... use messageId

    console.log("messageID in route.ts :: ", messageid);

    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return NextResponse.json(
            {
                success: false,
                message: "Not Authenticated !",
            },
            {
                status: 401,
            }
        );
    }

    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id },
            {
                $pull: { messages: { _id: messageid } },
            }
        );

        if (updatedResult.modifiedCount === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Message not found or already deleted",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Message Deleted",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Error in delete-message route.ts :: ", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error deleting message",
            },
            {
                status: 500,
            }
        );
    }
}
