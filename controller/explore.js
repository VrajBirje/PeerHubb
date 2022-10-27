
const Post= require('../models/PostContainer');
const Library= require('../models/library');


module.exports.Explore= async function(req,res){

    console.log("get");
    let post= await Post.find({}).sort({'vote':-1});

    return res.status(200).json({"message":post})

}

module.exports.Lib= async function(req,res){

    
    let lib= await Library.find({});
    console.log(lib);

    
    return res.status(200).json({"msg":lib})
}

module.exports.filter= async function (req,res){

     const type= req.body.type;
     const semester= req.body.semester;

     

     if(type==="none"&&semester==="none"){
        console.log("YYYYY")
        let lib= await Library.find({});
        return res.status(200).json({"msg":lib})

     }
     else if(type==="none"){
        let lib= await Library.find({semester:semester});
        return res.status(200).json({"msg":lib})
     }
     else if(semester==="none"){
        let lib= await Library.find({type:type});
        return res.status(200).json({"msg":lib})

     }
     else{
        let lib= await Library.find({type:type,semester:semester});
        return res.status(200).json({"msg":lib})

     }


}