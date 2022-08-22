
const User= require('../models/user');
const Post= require('../models/PostContainer');
module.exports.solved= async function(req,res){

   try{

    const currentuser=req.rootUser._id;
    const answerid=req.body.id;
    const pid=req.body.pid;
    const uid= req.body.uid;
    const user= await User.findOne({_id:uid});
    const problem= await await Post.findOne({"_id":pid});
    const name=problem.user._id;
    
   

    const correctUser=name.equals(req.userId);
    const solvedmyme=name.equals(uid);
    console.log(correctUser+" "+solvedmyme);
    if(!correctUser||solvedmyme||!currentuser||!uid||!answerid||!pid||!problem.status==="true"){
      return res.status(400).json({"message":"Done",});
    }

    problem.status="true"
    problem.save();
   
    user.point=user.point+5;
    user.solved.push(answerid);
    user.save();
    return res.status(200).json({"message":"Done",});


   }
   catch(err){
        console.log(err);
   }
} 