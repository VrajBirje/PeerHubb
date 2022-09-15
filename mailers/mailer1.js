const nodemailer= require('../config/mailer');

// this is another way
exports.newComment= (comment)=>{
     console.log("Inside new Coomment Mailer "+comment);

     nodemailer.transporter.sendMail({
        from:'namitvedwan16@gmail.com',
        to:comment,
        subject:"Welcome to the Doubt-Mate",
        html:'<h2>Hey Mate👺</h2>'


     },(err,info)=>{
        if(err)
        {
            console.log("Error in sedning mail " +err)
        }
        console.log("Message Sent ",info);
        return;
     })
}