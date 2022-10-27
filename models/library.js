const mongoose= require('mongoose');

const library= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
     },
     pdfname:{
        type:String,
        require:true
     },
     subject:{
         type:String,
         require:true
     },
     type:{
        type:String,
        require:true
     },
     semester:{
        type:String,
        require:true 
     },
     path:{
        type:String,
        require:true 
     }

},{
    timestamps:true
})


const Library= mongoose.model('Library',library);
module.exports=Library;