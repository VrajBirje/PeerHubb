

const PostContainer= require('../models/PostContainer');



module.exports.CreatePost= async function(req,res){
    
    

    try{
           const uid=req.rootUser._id;
           const heading=req.body.heading;
           const description=req.body.message;
           const type= req.body.type;
           const status="false";
           const hidden= req.body.hidden;
           const sub=req.body.subject;
           if(!uid||!heading||!description||!type||!hidden||!sub){
            return res.json(400,{
                message: "Invalid"
            })
           }

           PostContainer.create({
                      user:uid,
                      heading:heading,
                      description:description,
                      type:type,
                      hidden:hidden,
                      status:status
            },function(err,post){

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

                   
                    post.avatar= PostContainer.avatarPath+"/"+files.name;
                }
               
                if(sub){ 
                    post.subject=sub;
                }
              
                post.vote=0;
                post.save();


            })
        

           
           console.log("Kamm ")
           return res.json(200,{
            message: "Post completed"
        })



    }
    catch(err){
        console.log(err);
          return res.status(400).json({"message":err})
    }


    


}