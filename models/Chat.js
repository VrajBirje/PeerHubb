const UserInfo =  require("./user");
const mongoose = require("mongoose");

const ChatModel = mongoose.Schema(
    {
        chatName: {type: String, trim: true},
        isGroupChat: {type: Boolean, default: false},
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: UserInfo
        }],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserInfo
        }
    },
    {timestamps: true}
)

const Chat = mongoose.model("Chat", ChatModel);

module.exports = Chat;
