const User= require('../models/user');

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
           console.log("Present");
           return res.status(422).json({err:"Email-id Already Exist"});
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
        console.log("Present new");
        const user = new User({username,email,profession,university,enrolled, courseyr,password});
        user.point=1;
        await user.save();
         return res.status(200).json({Success:"Success Information Saved"});
    }
  }
  catch(err){
      console.log("E "+err)
  }
}