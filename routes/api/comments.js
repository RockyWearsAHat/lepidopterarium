const express = require('express');
const router = express.Router();


//Post route for adding user comments
router.post('/', async (req, res)=>{
    const {comment} = req.body;
    console.log('Recieved comment:', comment);
    // Todo add code to for adding comment to db.  The below gives an error
    // await Comments.create({ comments: comment });
    res.json({success: true, message: 'router post comments'})
});

//Post route for adding user comments
router.delete('/', async (req, res)=>{
    const {id} = req.body;
    console.log('Recieved comment:', commentID);

    // Todo add code to for deleting comment from db.  

    // const comment = await Comment.findByPk(id);
    // await comment.destroy();

    //End 
    res.json({success: true, message: 'router delete comment'})
});

module.exports = router;
