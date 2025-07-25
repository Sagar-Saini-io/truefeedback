import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        // const { messages } = await req.json();
        const prompt =
            "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
        const completion = openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            // messages,
            messages: [{ role: "user", content: `${prompt}` }],
        });

        // completion.then((result) => console.log(result.choices[0].message));
        const result = await completion; // Await the resolution of the 'completion' Promise
        const message = result.choices[0].message.content;
        // const content = message.content
        // console.log("Data using async/await:", message);

        return NextResponse.json({ message }, { status: 200 });
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json(
                {
                    name,
                    status,
                    headers,
                    message,
                },
                { status }
            );
        } else {
            console.error(
                "An unexpected error during generating ai messages",
                error
            );
            throw error;
        }
    }
}
