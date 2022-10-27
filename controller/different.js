
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


module.exports.vote= async function(req,res){

    const type= req.body.type;
    if(type==="null"){
        let post = await Post.find().sort({'vote':-1});
        return res.status(200).json({"message":post})
    }
    else{
 
        let post = await Post.find({"type":type}).sort({'vote':-1});
        return res.status(200).json({"message":post})
    }


}

module.exports.new= async function(req,res){
  const type= req.body.type;
    if(type==="null"){
        let post = await Post.find().sort({'createdAt':-1});
        return res.status(200).json({"message":post})
    }
    else{
        let post = await Post.find({"type":type}).sort({'createdAt':-1});
        return res.status(200).json({"message":post})
    }


}