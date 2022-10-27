const express= require('express');

const router= express.Router();
const Client=require('../controller/different');


router.get('/problem',Client.problem);

router.get('/carrer',Client.career);

router.get('/study-guide',Client.studyguide);

router.get('/gd',Client.groupd);

router.get('/feedback',Client.feedback);


router.post('/votes',Client.vote);
router.post('/new',Client.new);



module.exports=router;