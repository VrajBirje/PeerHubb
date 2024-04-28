const express= require('express');
const Authenticate= require('../config/passport-jwt');

const router= express.Router();

const Home= require('../controller/home');
const Log= require('../controller/login');
const Explore= require('../controller/explore');
const Create= require('../controller/create-post');
const detail= require('../controller/post-detail');
const comment= require('../controller/create-comment');
const solved= require('../controller/solved');
const ranking= require('../controller/ranking');
const voting= require('../controller/voting');




// home page
router.post('/register',Home.home);

router.post('/otp',Home.otp);

// login
router.post('/log-in',Log.login);

// explore

router.get('/explore',Explore.Explore);

router.get('/explorelib',Explore.Lib);

router.post('/libfilter',Explore.filter);


// for creating post

router.post('/create-post',Authenticate,Create.CreatePost);
router.post('/delete-post',Authenticate,Create.DeletePost);

router.post('/create-libpost',Authenticate,Create.library);

// verification of user
router.post('/verify-user',Authenticate,async (req,res)=>{
     

   return res.status(200).json({message:req.rootUser});

})

// for checking each post

router.post('/explore-post',detail.Detail);


// for comment
router.post('/create-comment',Authenticate,comment.Comment);


// for solved
router.post('/solved',Authenticate,solved.solved);


router.use('/different',require('./clinet'));


router.get('/ranking',ranking.rank);

router.post('/upvote',Authenticate,voting.upvote);
router.post('/downvote',Authenticate,voting.downvote);

router.post('/logout',Log.logout);


router.use('/most',require('../router/clinet'));








module.exports=router;
