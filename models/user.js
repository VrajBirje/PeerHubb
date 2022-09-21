const mongoose= require('mongoose');
const bycrypt= require('bcryptjs');

const user= new mongoose.Schema({
      username:{
          type:String,
          required:true,
          
      },
      email:{
        type:String,
          required:true,
          unique:true
      },
      profession:{
        type:String,
        required:true,
        
      },
      password:{
        type:String,
         required:true
      },
      university:{
        type:String,
        required:true
     },
     enrolled:{
        type:String,
        required:true
     },
     
     point:{
         type:Number,
        
     },
     problems:{
        type:String,
     },
     answers:{
        type:String,
     },
     tokens:[
      {
         
            type:String
         
      }
   ],
   solved:[
      {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Answer'
      }
   ]


},{
    timestamps:true
});


const UserInfo= mongoose.model('UserInfo',user);

module.exports=UserInfo;