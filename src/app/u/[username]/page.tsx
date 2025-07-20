"use client";

import { ColourfulText } from "@/components/ui/colourful-text";
import { useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "sonner";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/schemas/message.Schema";
import { Textarea } from "@/components/ui/textarea";

// Define the MessageSplitter component outside the main page component
interface MessageItem {
    content: string;
}

interface MessageSplitterProps {
    generateMessages: string;
    onMessageSelect: (message: string) => void; // Callback to select a message
}

export default function page() {
    const params = useParams<{ username: string }>();
    const router = useRouter();

    const [content, setContent] = useState("");
    const [username, setUsername] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setUsername(params.username);
    }, [params.username]);

    // ZOD implementaion
    const form = useForm<z.infer<typeof messageSchema>>({
        // register
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    });

    // submit handler or API reuqest
    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
        setIsSubmitting(true);
        // console.log("Onsubmitting data :: ", data);
        try {
            const response = await axios.post<ApiResponse>(
                `/api/send-message`,
                { ...data, username }
            );
            toast.success(response.data.message);
            setIsSubmitting(false);
            form.reset();
        } catch (error) {
            console.error("Error in Sending Message to User :: ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast.error(errorMessage);

            setIsSubmitting(false);
        }
    };

    // AI integration work
    const [generateMessages, setGenerateMessages] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateAgain, setGenerateAgain] = useState(false);
    const [messages, setMessages] = useState<string[]>([]); // Add <string[]> here

    // Effect 1: Fetch suggested messages from API
    useEffect(() => {
        const suggestMessages = async () => {
            setIsGenerating(true);
            try {
                const response = await axios.post<ApiResponse>(
                    `/api/suggest-messages`
                );
                if (response.data.message) {
                    toast.success("Messages generated successfully!");
                }
                setGenerateMessages(response.data.message);
            } catch (error) {
                console.error("Error in Generating Message by AI :: ", error);
                const axiosError = error as AxiosError<ApiResponse>;
                let errorMessage = axiosError.response?.data.message;
                toast.error(errorMessage || "Failed to generate messages.");
            } finally {
                setIsGenerating(false);
            }
        };

        suggestMessages(); // Call on initial mount and when generateAgain changes
    }, [generateAgain]); // Dependency array: runs when generateAgain changes

    // Effect 2: Split generateMessages into individual messages
    useEffect(() => {
        if (generateMessages) {
            // Only split if generateMessages is not empty
            const cleanedMessage = generateMessages.replace(/^'|'$/g, "");
            const messagesArray = cleanedMessage
                .split("||")
                .map((part) => part.trim())
                .filter((part) => part.length > 0);
            setMessages(messagesArray);
        } else {
            setMessages([]); // Clear messages if generateMessages becomes empty
        }
    }, [generateMessages]); // Dependency array: runs when generateMessages changes
    // console.log("generateMessages :: ", generateMessages);

    return (
        <>
            <div>
                <h1 className="font-bold text-4xl text-center mt-10  mb-6 ">
                    <ColourfulText
                        text="Public Profile Link"
                        color="rgb(10, 10, 10)"
                    />
                </h1>
                <Link
                    className=" flex justify-center underline   text-blue-400"
                    href={`/`}
                >
                    Get Your Message Board
                </Link>
            </div>

            <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
                {" "}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6  "
                    >
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {" "}
                                        <p className="mr-100 font-medium text-lg ">
                                            Send Anonymous Message to @
                                            <span className="font-bold italic">
                                                {params.username}
                                            </span>{" "}
                                        </p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your anonymous message here"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className=" "
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Send"
                            )}
                        </Button>
                    </form>
                </Form>
                <p className="mt-10 text-lg ">
                    Click on any message below to select it.
                </p>
                <div>
                    {" "}
                    <div className="flex flex-col justify-center align-middle mt-10 border-zinc-200 border-1 p-4 rounded-2xl ">
                        <h1 className="text-2xl font-bold mb-5">Messages</h1>

                        <div className="flex flex-col mx-auto mt-5 gap-10  ">
                            {(() => {
                                if (isGenerating) {
                                    return (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin ml-6" />
                                            generating ...
                                        </>
                                    );
                                } else if (messages.length > 0) {
                                    return messages.map((message, index) => (
                                        <h1
                                            key={index}
                                            className="hover:scale-105 hover:font-semibold transition-all duration-100 cursor-pointer mx-auto"
                                            onClick={() =>
                                                form.setValue(
                                                    "content",
                                                    message
                                                )
                                            }
                                        >
                                            {message}
                                        </h1>
                                    ));
                                } else {
                                    return (
                                        <p className="text-gray-500 text-center">
                                            No suggested messages available.
                                        </p>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                    <Button
                        className=" flex mx-auto mt-5"
                        onClick={() => setGenerateAgain(!generateAgain)}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                                Please wait
                            </>
                        ) : (
                            "Generate Messages"
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
}
