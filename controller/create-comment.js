

const PostContainer= require('../models/PostContainer');
const Answer=require('../models/Answer');
module.exports.Comment= function(req,res){


    try{
        const uid=req.rootUser._id;
        const hidden=req.body.hidden;
        const answer=req.body.comment;
        const postid= req.body.postid;
        if(!uid||!hidden||!answer||!postid){
            return res.status(400).json({"message":"Invalid",});
        }
 
        Answer.create({
            answer:answer,
            problem:postid,
            user:uid,
            hidden:hidden

        },function(err,answer){
            if(err){
                console.log(err);
                return res.status(400).json({"message":err})
            }
            if(req.files){
                var files=req.files.img;
                files.mv('uploads/users/'+files.name,function(err){
                    if(err){
                        console.log(err);
                    }
                })

               
                 answer.avatar= PostContainer.avatarPath+"/"+files.name;
                 answer.save();
                
            }

        })
        return res.json(200,{
            message: "Comment completed"
        })




    }
   catch(e){
      console.log(e);

   }
    
}