const nodemailer= require('../config/mailer');

// this is another way
exports.newComment= (email,otp)=>{
   

     nodemailer.transporter.sendMail({
        from:'namitvedwan16@gmail.com',
        to:email,
        subject:"OTP-Verification from Doubt Mate",
        html:'<h2>Hello </h2> <br/> Please Do not Share this Otp to anyone <br/> '+otp +'<br/> Doubt-Mate'


     },(err,info)=>{
        if(err)
        {
            console.log("Error in sedning mail " +err)
        }
        console.log("Message Sent ",info);
        return;
     })
}

exports.newaccount= (email,name)=>{
   

   nodemailer.transporter.sendMail({
      from:'namitvedwan16@gmail.com',
      to:email,
      subject:"Account Acceptance",
      html:`<h3>Hey </h3>`+name +'<br/>' +'<p>We are Welcome you at our Group , now You can publish a Post (Educational only)<p/> <br/> Thanks <br/> Best Wishes'


   },(err,info)=>{
      if(err)
      {
          console.log("Error in sedning mail " +err)
      }
      console.log("Message Sent ",info);
      return;
   })
}



