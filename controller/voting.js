
const Post= require('../models/PostContainer');

module.exports.upvote= async function(req,res){

  
    
    const userId= req.rootUser._id;
    const myObjectIdString = userId.toString();

    

    let post= await Post.findOne({_id:req.body.id});

    let alreadypresnt=false;
    let upvote= await post.upvote;
    let downvote= await post.downvote;
    let downpresent=false;
    upvote.forEach(function(item){
        if(userId.equals(item)){
            alreadypresnt=true;
            
        }
    })
    downvote.forEach(function(item){
        if(userId.equals(item)){
            downpresent=true;
        }
    })

    if(alreadypresnt){

        return res.status(200).json({"message":"Already Voted","vote":post.vote})
        // already voted
    }
    if(downpresent){
        // pull out
        post.downvote.pull(userId);
        // post.save() ;
        post.vote= post.upvote.length-post.downvote.length;
        post.save() ;
        return res.status(200).json({"message":"Upvotes","vote":post.vote})
    }

    // otherwise push it 
    post.upvote.push(myObjectIdString);
    // post.save();
    post.vote= post.upvote.length-post.downvote.length;
    post.save() ;

    return res.status(200).json({"message":"Upvotes","vote":post.vote})

    

    


  

}


module.exports.downvote= async function(req,res){

    
     

      
    const userId= req.rootUser._id;
    const myObjectIdString = userId.toString();

    

    let post= await Post.findOne({_id:req.body.id});

    let alreadypresnt=false;
    let upvote= await post.upvote;
    let downvote= await post.downvote;
    let downpresent=false;
    upvote.forEach(function(item){
        if(userId.equals(item)){
            alreadypresnt=true;
            
        }
    })
    downvote.forEach(function(item){
        if(userId.equals(item)){
            downpresent=true;
        }
    })

    if(alreadypresnt){
        console.log("down");
        post.upvote.pull(userId);
        // post.save();
        post.vote= post.upvote.length-post.downvote.length;
        post.save() ;
        return res.status(200).json({"message":"Upvotes","vote":post.vote})
    }
    if(downpresent){
        // pull out
       
        return res.status(200).json({"message":"Already Voted","vote":post.vote})
    }

    // otherwise push it 
    post.downvote.push(myObjectIdString);
    // post.save();
    post.vote= post.upvote.length-post.downvote.length;
    post.save() ;

    return res.status(200).json({"message":"Upvotes","vote":post.vote})



}