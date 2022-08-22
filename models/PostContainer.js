const mongoose= require('mongoose');
const bycrypt= require('bcryptjs');

//import mutler so that we can handle multipartdata-type
const multer= require('multer');

const path= require('path');
const Avatar_Path= path.join('/uploads/users')

const Container= new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
     },
     heading:{
         type:String,
         require:true
         
     },
     description:{
        type:String,
        require:true
     },
     subject:{
        type:String,
        
     },
     type:{
        type:String,
        require:true
     },
     avatar:{
        type:'string'
     },
     status:{
        type:String,
        require:true
     },
     hidden:{
        type:String,
        require:true
     },
     upvote:[
       {  
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
       }
     ],
    downvote:[
        {  
         type:mongoose.Schema.Types.ObjectId,
         ref:'UserInfo'
        }
      ],
    vote:{
        type:Number,
         require:true
    }



},{
    timestamps:true
});


let storage= multer.diskStorage({
    // where the file to be store
    destination: function(req,file,cb){

        console.log("File 0 "+file)
        cb(null,path.join(__dirname, '..',Avatar_Path));
            //  models+ one step back + avatar_path
    },
    // name of file 
    filename: function(req,file,cb){
        console.log("File "+file)
        console.log(file.fieldname+'-'+Date.now()+" "+file)
        cb(null,file.fieldname+'-'+Date.now());
        // fieldname is avatar

    }
})

// Static Function         only single file for name=avatar
Container.statics.uploadedAvatar= multer({
    storage:storage,
    
    fileFilter: function(req,file,cb){

        console.log(file+" file");
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
            cb(null,true);
        }
        else{
            cb(null,false);
            return cb(new Error("Only Jpg, png file Allowed"))
        }
    }


}).single('avatar'); 

Container.statics.avatarPath=Avatar_Path;


const Post= mongoose.model('Post',Container);

module.exports=Post;