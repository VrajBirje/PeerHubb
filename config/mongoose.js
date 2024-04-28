const mongoose = require("mongoose");
//const DB ="mongodb+srv://doubt-mate:kYLK399ddtzObwUI@cluster0.wfiyypm.mongodb.net/doubt-mate?retryWrites=true&w=majority";
const DB1 = "mongodb://localhost/doubt";
// const DB1 = "mongodb+srv://alfiyasiddique1708:2xX53iUWaiR8DYak@cluster0.h38myrq.mongodb.net/Doubt?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB1);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to Database"));

db.once("open", function () {
  console.log("Connect to MongoDb Successfully");
});

module.exports = db;
