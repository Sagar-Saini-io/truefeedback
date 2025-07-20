import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUp.Schema";

const usernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    //
    // if (request.method !== "GET") {
    //     return Response.json(
    //         {
    //             success: false,
    //             message: "ONLY GET METHOD IS ALLOWED",
    //         },
    //         {
    //             status: 405,
    //         }
    //     );
    // }

    await dbConnect();
    // URL : localhost:3000/api/cuu?username=Abc?etc
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username"),
        };
        // Validate with zod
        const result = usernameQuerySchema.safeParse(queryParams);
        console.log(`ZOD Check username result :: ${result}`);

        if (!result.success) {
            const usernameErrors =
                result.error.format().username?._errors || [];

            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(", ")
                            : "Invalid query parameters",
                },
                {
                    status: 400,
                }
            );
        }

        const { username } = result.data;

        const exitingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (exitingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "username is already taken",
                },
                {
                    status: 400,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "username is unique",
            },
            {
                status: 200,
            }
        );

        //
    } catch (error) {
        console.error("Error --> Checking Username", error);
        return Response.json(
            {
                success: false,
                message: "Error :: Checking username !!!",
            },
            {
                status: 500,
            }
        );
    }
    //
}
