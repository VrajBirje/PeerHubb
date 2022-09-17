
const mongoose= require('mongoose');
const bycrypt= require('bcryptjs');

const fake= new mongoose.Schema({
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
     courseyr:{
        type:Date,
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
   otp:{
    type:String,
    required:true
   }


},{
    timestamps:true
});





// Hashing the password

fake.pre('save', async function(next){
    console.log("Inside");
    if(this.isModified('password')){
       
       var password=this.password;
       await bycrypt.hash(password, 6).then(function(hash) {
 
          console.log(hash);
          password=hash;
      });
    
      this.password=password;
    }
    next();
 })


const FakeUser= mongoose.model('FakeUser',fake);

module.exports=FakeUser;