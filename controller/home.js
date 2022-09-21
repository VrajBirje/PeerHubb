const User= require('../models/fakeuser');
var newOTP = require('otp-generators')
const Realuser= require('../models/user');

const mailer= require('../mailers/mailer1');

module.exports.home= async function(req,res){
  
    const {username,email,profession,university,enrolled,password}= req.body;

    if(!username || !email|| !profession||!university||!enrolled||! password){
        console.log("Present not");
        return res.status(422).json({err:"Incomplete Information"});
    }
    try{

      const userExists= await User.findOne({email:email});
      const realExists= await Realuser.findOne({email:email});
      if(realExists){
        return res.status(422).json({err:"Login-Please"});
      }

       //  To Check if User Already Valid or not
       if(userExists){
           userExists.delete();
          const otp=newOTP.generate(6, { alphabets: true, upperCase: false, specialChar: false });
          const user = new User({username,email,profession,university,enrolled,password,otp});
          user.point=1;
          await user.save();
          mailer.newComment(email,otp);
          return res.status(200).json({email:email});
       }
       //To check if Email is provided by univeristy of not
            const email1 = email.substring(email.length-19,email.length);
            const check= "srmuniversity.ac.in";
            if(email1!==check){

            console.log("Email not matching");
            return res.status(422).json({err:"Email-id is not Provided by Authority"});
          }

      



    // Decrypt the password

    else{
        
        const otp=newOTP.generate(6, { alphabets: true, upperCase: false, specialChar: false });
        const user = new User({username,email,profession,university,enrolled,password,otp});
        user.point=1;
     
        await user.save();
        mailer.newComment(email,otp);
         return res.status(200).json({email:email});
    }
  }
  catch(err){
      console.log("E "+err)
  }
}

module.exports.otp= async function(req,res){
    const {useremail,myotp}= req.body;
   
    if(!useremail||!myotp){
      return res.status(422).json({err:"Invalid"});
    }
    const userExists= await User.findOne({email:useremail});

    if(userExists){
        
      const otp= userExists.otp;
      console.log(otp);
      console.log(myotp);

      const realExists= await Realuser.findOne({email:useremail});
      
      if(myotp!==otp||realExists){
        return res.status(422).json({err:"Invalid"});
      }
      if(myotp===otp){
         const username= userExists.username;
         const email=userExists.email;
         const profession=userExists.profession;
         const university=userExists.university
         const enrolled=userExists.enrolled;
        //  const courseyr=userExists.courseyr;
         const password= userExists.password;
        
 
         const realuser = new Realuser({username,email,profession,university,enrolled,password});
         realuser.point=1;
      
         await realuser.save();
         mailer.newaccount(email,username);

         return res.status(200).json({email:email});



      }
      else{
        return res.status(422).json({err:"Invalid"});
      }
       

    }



}