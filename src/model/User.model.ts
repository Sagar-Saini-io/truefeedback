import mongoose, { Schema, Document } from "mongoose";

// User Message

export interface Message extends Document {
    _id: string;
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "Content is required !"],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// User Date

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
    createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required !"],
        trim: true,
        unique: [true, "Already exist"],
    },
    email: {
        type: String,
        required: [true, "Email is required !"],
        unique: [true, "Already exist"],
        match: [/.+\@.+\..+/, "please use a valid email address"],
        // match: [
        //     /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\/,
        //     "please use a valid email address",
        // ],
    },
    password: {
        type: String,
        required: [true, "Passowrd is required !"],
    },
    verifyCode: {
        type: String,
        required: [true, "Valid Code is required !"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required !"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;
