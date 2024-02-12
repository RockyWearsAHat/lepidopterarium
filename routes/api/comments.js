const express = require('express');
const router = express.Router();
const User = require("../../models/Comments");
const Comments = require('../../models/Comments');


//Post route for adding user comments
router.post('/', async (req, res)=>{
    
    const {comment} = req.body;
    // console
    // console.log('Recieved comment:', comment);
    // console.log(req.session.username.username)

    if (comment) {
        await Comments.create({
            comment: comment, 
            userId: req.session.username.id,
            lepoId: req.rawHeaders[11][lepoId.length-1],
        });
        console.log("comment created")
    } else {
        console.log('Nothing to post')
    }
    res.json({success: true, message: 'router post comments'})
});

//Post route for adding user comments
// router.delete('/', async (req, res)=>{
//     const {id} = req.body;
//     console.log('Recieved comment:', commentID);

//     // Todo add code to for deleting comment from db.  

//     // const comment = await Comment.findByPk(id);
//     // await comment.destroy();

//     //End 
//     res.json({success: true, message: 'router delete comment'})
// });

module.exports = router;
