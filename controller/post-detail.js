const Post= require('../models/PostContainer');
const Answer= require('../models/Answer');
module.exports.Detail= async function(req,res){

    const id=req.body.postId;

    const post= await Post.findOne({_id:id})
    let Ans= await Answer.find({"problem":id})
    //  let Ans= await Answer.findOne({"problem":id});

    console.log("hey");
    console.log(req.body);
    return res.status(200).json({"message":post,"message2":Ans});

}