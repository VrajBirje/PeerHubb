import mongoose, { mongo } from "mongoose";
import UserInfo from "./user";
import Chat from "./Chat";
import { type } from "express/lib/response";

const messageModel = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: UserInfo},
    content: {type: String, trim: true},
    chat: {type: mongoose.Schema.Types.ObjectId, ref: Chat}
}, {timestamps: true})

const Message = mongoose.model("Message", messageModel);
export default Message;
