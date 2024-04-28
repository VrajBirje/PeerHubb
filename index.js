const express = require("express");
const port = 7780;
const app = express();
var cookies = require("cookie-parser");
var fileupload = require("express-fileupload");
var cors = require("cors");
const chatRouter = require("./router/chatRoutes");
const messageRouter = require("./router/messageRoutes");

// Path function
const path = require("path");

// set engine ejs in form of key and value
app.set("view engine", "ejs");

app.use(cors(
  // {origin:"http://localhost:3000/"}
));
app.use(cookies());

// For Views Folder
app.set("views", path.join(__dirname, "views"));

// Adding Static Files for desing

// Import Passport
const passport = require("passport");

// // Import Jwt
// const passportJwt= require('./config/passport-jwt');

const db = require("./config/mongoose");
const { Socket } = require("socket.io");

app.use(express.static("asset"));
app.use(fileupload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use("/", require("./router"));
app.use("/chat", chatRouter)
app.use("/message", messageRouter)

const server = app.listen(port, function (err) {
  if (err) {
    console.log("Error " + err);
    return;
  } else {
    console.log("Server is running fine");
  }
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {origin: "http://localhost:3000"}
})

io.on("connection", (socket)=>{
  console.log("Connected to socket.io")

  socket.on("setup", (userData)=>{
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit("connected")
  });

  socket.on("join chat", (room)=>{
    socket.join(room)
    console.log("User joined Room:"+room)
  });

  socket.on("new message", (newMessageRecieved)=>{
    let chat = newMessageRecieved.chat;
    if(!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user=>{
      if(user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("messsage received", newMessageRecieved);
    })
  })
})
