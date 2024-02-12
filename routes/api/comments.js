const express = require('express');
const router = express.Router();

const Lepo = require("../../models/Lepo")
const Comments = require('../../models/Comments');


//Post route for adding user comments
router.post('/', async (req, res)=>{
    
    const {comment, butterflyName} = req.body;
    // console
    // console.log('Recieved comment:', comment);
    // console.log(req.session.username.username)
    console.log(`HERE WE ARE`)
    const lepoId = await Lepo.findOne({where: {name: butterflyName}})
    console.log(lepoId.dataValues.id)
    const myLepoId = lepoId.dataValues.id;
    if (comment) {
        await Comments.create({
            comment: comment, 
            userId: req.session.username.id,
            lepoId: myLepoId,
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
