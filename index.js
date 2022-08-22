const express= require('express');
const port=process.env.PORT||6000;
const app= express();
var cookies = require("cookie-parser");
var fileupload = require("express-fileupload");






// Path function
const path=require('path');

// set engine ejs in form of key and value
app.set('view engine','ejs');
app.use(cookies());





// For Views Folder
app.set('views',path.join(__dirname,'views'));

// Adding Static Files for desing

// Import Passport
const passport= require('passport');



// // Import Jwt 
// const passportJwt= require('./config/passport-jwt');

const db= require('./config/mongoose');

app.use(express.static('asset'));
app.use(fileupload());

app.use(express.json())

app.use('/uploads', express.static(__dirname+'/uploads'));
app.use('/public', express.static('public'))

app.use('/',require('./router'))




app.listen(port,function(err){
    if(err){
        console.log("Error "+err);
        return;
    }
    else{
        console.log("Server is running fine");
    }
})


// deploye
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
}