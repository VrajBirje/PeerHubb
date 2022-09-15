const express= require('express');
const port=7789;
const app= express();
var cookies = require("cookie-parser");
var fileupload = require("express-fileupload");
var cors = require('cors');






// Path function
const path=require('path');

// set engine ejs in form of key and value
app.set('view engine','ejs');


app.use(cors());
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
app.use('/uploads', express.static('uploads'))

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
