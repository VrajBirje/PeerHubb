const User= require('../models/user');
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');

module.exports.login= async function(req,res){

  try{

    
    const {email,password}= req.body;

    
    if(!email||!password){
        return res.status(400).json({"error":"Ivalid Information"})
    }

    // To check if Email is present or not
    const user= await User.findOne({email:email});
    if(!user){
        return res.status(400).json({"message":"Invalid"})
    }

    // To check the decrypt password
    const ismatch= await bcryptjs.compare(password,user.password);

    // Mismatch False
    if(!ismatch){
       
      return res.json(422,{
        message: "Invalid"
    })
    }

    // Match True
    else{

       const keyy=await jwt.sign(user.toJSON(),'doubt');
      
        // user.tokens.push(keyy);
        // await user.save();
       
        res.cookie('token', keyy,{
        expiresIn:'1000000',
        httpOnly:true
       });

       console.log("Verify");
     
      
      return res.json(200,{
        message: "valid"
    })

   
    }

  }
  catch(error){
    console.log(err+" Login");
    return res.status(401).json({Message:error});

  }

}

module.exports.logout= async function(req,res){


  res.clearCookie('token');
  return res.json(200,{
    message: "valid"
})
}