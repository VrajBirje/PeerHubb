const nodemailer= require('../config/mailer');

// this is another way
exports.newComment= (email,otp)=>{
   

     nodemailer.transporter.sendMail({
        from:'namitvedwan16@gmail.com',
        to:email,
        subject:"Welcome to the Doubt-Mate",
        html:'<h2>Hey Mate👺</h2> '+otp


     },(err,info)=>{
        if(err)
        {
            console.log("Error in sedning mail " +err)
        }
        console.log("Message Sent ",info);
        return;
     })
}