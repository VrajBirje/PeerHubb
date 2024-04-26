const asyncHandler = require("express-async-handler")
const Chat = require("../models/Chat")
const User = require("../models/user");

const accessChat = asyncHandler(async (req, res)=>{
     const {userId} = req.body
     console.log(userId);

     if(!userId){
        console.log("UserId param not sent with request")
        return res.sendStatus(400)
     }

     let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
           {users: {$elemMatch: {$eq: req.userId}}},
           {users: {$elemMatch: {$eq: userId}}}
        ]
     }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username email"
    });

    if(isChat.length > 0){
        res.send(isChat[0])
    }else{
        const receiver = await User.findOne({_id: userId})
        const chatData = {
            chatName: receiver.username,
            isGroupChat: false,
            users: [req.userId, userId]
        };

        try {
            const createdChat = await Chat.create(chatData)

            const fullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
         
    }
    
});

const fetchChat = asyncHandler(async (req, res)=>{
    try {
        Chat.find({users: {$elemMatch: {$eq: req.userId}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (results)=>{
            results = await User.populate(results, {
               path: "latestMessage.sender",
               select: "username email"
            });
            res.status(200).send(results)
        });
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async (req, res)=>{

    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please Fill all the details"});
    }
    
    let users = JSON.parse(req.body.users)

    if(users.length < 2){
        res.status(400).send({message: "More than 1 user is required to create a group chat."});
    }

    users.push(req.rootUser)

    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.rootUser
        })

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat)
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
});

const renameGroup = asyncHandler(async (req, res)=>{
  const {chatId, chatName} = req.body;
  
  const updatedChat = await Chat.findByIdAndUpdate(chatId, 
     {chatName}, {new: true}
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");

  if(!updatedChat){
    res.status(400)
    throw new Error("Chat not found")
  }else{
    res.status(200).json(updatedChat)
  }
   
})

const addToGroup = asyncHandler(async (req, res)=>{
    const {chatId, addUserId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId, 
       {$push: {"users": addUserId}}, {new: true}
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added){
        res.status(400)
        throw new Error("Chat not found")
      }else{
        res.status(200).json(added)
      }

})

const removeFromGroup = asyncHandler(async (req, res)=>{
    const {chatId, removeUserId} = req.body;

    const removed = await Chat.findByIdAndUpdate(chatId, 
       {$pull: {"users": removeUserId}}, {new: true}
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removed){
        res.status(400)
        throw new Error("Chat not found")
      }else{
        res.status(200).json(removed)
      }

})

module.exports  = {
    accessChat,
    fetchChat,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
}
