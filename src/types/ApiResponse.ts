import { Message } from "@/model/User.model";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    isAcceptingMessage?: boolean;
    messages?: Array<Message>;
    content?: string;
}
