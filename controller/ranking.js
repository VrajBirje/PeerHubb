
const User= require('../models/user');

module.exports.rank= async function(req,res){

    const user= await User.find().sort({'point':-1});

  

    
    

    return res.status(200).json({"message":user});



}