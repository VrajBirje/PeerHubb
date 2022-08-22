
const Post= require('../models/PostContainer');

module.exports.problem= async function(req,res){
    let post = await Post.find({"type":"Problem"}).sort({'vote':-1});
   return res.status(200).json({"message":post})


}


module.exports.career= async function(req,res){

   let post = await Post.find({"type":"Career"}).sort({'vote':-1});
   return res.status(200).json({"message":post})

    
}

module.exports.studyguide= async function(req,res){
    let post = await Post.find({"type":"Study Guide"}).sort({'vote':-1});
    return res.status(200).json({"message":post})

    
}

module.exports.groupd= async function(req,res){

    let post = await Post.find({"type":"Group Discussion"}).sort({'vote':-1});
    return res.status(200).json({"message":post})

    
}

module.exports.feedback= async function(req,res){

    let post = await Post.find({"type":"Feedback And Support"}).sort({'vote':-1});
    return res.status(200).json({"message":post})


    
}