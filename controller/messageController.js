const asyncHandler = require("express-async-handler")
const Message = require("../models/Message")
const User = require("../models/user");
const Chat = require("../models/Chat");

const sendMessage = asyncHandler(async (req, res)=>{
   const {content, chatId} = req.body;

   if(!content || !chatId){
    console.log("Invalid data passed into request")
    return res.sendStatus(400);
   }

   const newMessage = {
    sender: req.userId,
    content: content,
    chat: chatId
   }

   try {
      let message = await Message.create(newMessage);
      
      message = await message.populate("sender", "username");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email"
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message
      })

      res.status(200).json(message)
   } catch (error) {
    res.status(400)
    throw new Error(error.message)
   }
})

const allMessages = asyncHandler(async (req,res)=>{
    try {
        const messages = await Message.find({chat: req.params.chatId})
        .populate("sender", "name email")
        .populate("chat");

        res.status(200).json(messages)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = {sendMessage, allMessages}
