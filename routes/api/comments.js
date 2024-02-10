const express = require('express');
const router = express.Router();

// router.get('/', (req,res)=>{
//     res.send("Got it")
// })

//Post route for handling user comments
router.post('/', async (req, res)=>{
    const {comment} = req.body;
    console.log('Recieved comment:', comment);
    res.json({success: true, message: 'Routed comments saved al;kjsdfl;fj'})
});

module.exports = router;