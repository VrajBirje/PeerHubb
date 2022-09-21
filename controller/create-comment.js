

const PostContainer= require('../models/PostContainer');
const Answer=require('../models/Answer');
const mailer= require('../mailers/mailer1');
module.exports.Comment= async function(req,res){


    try{
        const uid=req.rootUser._id;
        const hidden=req.body.hidden;
        const answer=req.body.comment;
        const postid= req.body.postid;
        if(!uid||!hidden||!answer||!postid){
            return res.status(400).json({"message":"Invalid",});
        }
 
        const Post = await PostContainer.findOne({"_id":postid}); 
        const Post11 = await PostContainer.findOne({"_id":postid}).populate('user'); 
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
        // console.log(Post.user);
        // console.log(Post.user.email);
        // console.log(Post11.user.email);
        const email= Post11.user.email;
        mailer.newanswer(email);
        return res.json(200,{
            message: "Comment completed"
        })




    }
   catch(e){
      console.log(e);

   }
    
}