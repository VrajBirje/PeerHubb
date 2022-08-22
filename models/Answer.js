const mongoose= require('mongoose');

const answers= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
     },
     problem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'POST'
     },
     answer:{
         type:String,
         require:true
     },
     avatar:{
        type:String,
     },
     hidden:{
        type:String,
        require:true 
     }

},{
    timestamps:true
})


const Answer= mongoose.model('Answer',answers);
module.exports=Answer;