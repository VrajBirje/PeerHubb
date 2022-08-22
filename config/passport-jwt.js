const jwt= require('jsonwebtoken');
const user= require('../models/user');


const Authenticate= async (req,res,next)=>{

     try{
      
       const token=req.cookies.token;
       const verify=jwt.verify(token,'doubt');

     
       const rootUser= await user.findOne({_id:verify._id});

       if(!rootUser){
       
           return;
       }
       req.token=token;
       req.rootUser=rootUser;
       req.userId=rootUser._id;

       next();


     }

     catch(err){
       console.log(err+"Jwt");
      return res.status(401).json({Message:"Unauthorized"});
        
     }



}


module.exports=Authenticate;