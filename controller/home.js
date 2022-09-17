const User= require('../models/fakeuser');
var newOTP = require('otp-generators')

const mailer= require('../mailers/mailer1');

module.exports.home= async function(req,res){
  
    const {username,email,profession,university,enrolled, courseyr,password}= req.body;
    console.log(username+" "+email+" "+courseyr);
    if(!username || !email|| !profession||!university||!enrolled||! courseyr||!password){
        console.log("Present not");
        return res.status(422).json({err:"Incomplete Information"});
    }
    try{

      const userExists= await User.findOne({email:email});

       //  To Check if User Already Valid or not
       if(userExists){
           userExists.delete();
          const otp=newOTP.generate(6, { alphabets: true, upperCase: false, specialChar: false });
          const user = new User({username,email,profession,university,enrolled, courseyr,password,otp});
          user.point=1;
          await user.save();
          mailer.newComment(email,otp);
          return res.status(200).json({email:email});
       }
       //To check if Email is provided by univeristy of not
            const email1 = email.substring(email.length-20,email.length);
            const check= ".srmuniversity.ac.in";
            if(email1!==check){

            console.log("Email not matching");
            return res.status(422).json({err:"Email-id is not Provided by Authority"});
          }

      



    // Decrypt the password

    else{
        
        const otp=newOTP.generate(6, { alphabets: true, upperCase: false, specialChar: false });
        const user = new User({username,email,profession,university,enrolled, courseyr,password,otp});
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