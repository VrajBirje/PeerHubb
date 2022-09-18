const User= require('../models/user');
const bcryptjs= require('bcryptjs');
const jwt= require('jsonwebtoken');
const mailer= require('../mailers/mailer1');

module.exports.login= async function(req,res){

  try{

    
    const {email,password}= req.body;
  
    
    console.log(email,password);
    if(!email||!password){
        return res.status(400).json({"error":"Ivalid Information"})
    }

    // To check if Email is present or not
    const user= await User.findOne({email:email});
    console.log(user);
    if(!user){
        return res.status(400).json({"message":"Invalid"})
    }

    // To check the decrypt password
    const ismatch= await bcryptjs.compare(password,user.password);

    // Mismatch False
    if(!ismatch){
       console.log('Mis Match');
      return res.json(422,{
        message: "Invalid"
    })
    }

    // Match True
    else{
      console.log(email,password);
       const keyy=await jwt.sign(user.toJSON(),'doubt',{expiresIn: '10000000'});
      
        // user.tokens.push(keyy);
        // await user.save();
       
        res.cookie('token', keyy,{
        expiresIn:'10000000',
        httpOnly:true,
        
       });

       console.log("Verify");
       mailer.newComment(email);
      
       return res.json(200,{
        message: "valid",
        cookie:keyy
    })

   
    }

  }
  catch(error){
    console.log(err+" Login");
    return res.status(401).json({Message:error});

  }

}

module.exports.logout= async function(req,res){

  
  
  return res.json(200,{
    message: "valid"
})
}