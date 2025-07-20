"use client";

import React from "react";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User.model";
import { toast } from "sonner";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId?: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
    //
    const handleDeleteConfirmed = async () => {
        const response = await axios.delete<ApiResponse>(
            `/api/delete-message/${message._id}`
            // `/api/delete-message?messageid=${message._id}`
        );
        toast.success(response.data.message);
        onMessageDelete(message._id);
        // onMessageDelete(message._id.toString());
        // onMessageDelete(message._id ? message._id.toString() : undefined);
    };
    //
    return (
        <div>
            <Card className="bg-stone-900 text-white">
                <CardHeader>
                    <AlertDialog>
                        <CardTitle>{message.content}</CardTitle>
                        <AlertDialogTrigger asChild>
                            <div className="relative">
                                <Button
                                    className="w-10 absolute top-0  right-0"
                                    variant="destructive"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteConfirmed}
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {/* <CardDescription>Card Description</CardDescription> */}

                    {/* <CardAction>
                        <Button className="w-10  " variant="destructive">
                            <X className="w-5 h-5" />
                        </Button>
                    </CardAction> */}
                </CardHeader>
                <CardContent>{/* <p>Card Content</p> */}</CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </div>
    );
}

export default MessageCard;
