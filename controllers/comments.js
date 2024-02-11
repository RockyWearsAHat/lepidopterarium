const router = require('express').Router();
const commentsAndUsers = [
    { comment: 'Sick butterfly', user: 'Spidey' },
    { comment: `Takes me back to the good 'ol days, when we would entertain ourselves with catching butterfly tournaments`, user: 'Mazerrackham' },
    { comment: 'Have you ever petted a butterfly', user: 'Vegeta' },
];

router.get('/', async (req, res) => {
    res.render('index', {commentsAndUsers});
  });
  
//   // get one dish
//   router.get('/', async (req, res) => {
//     return res.render('dish', commentsAndUsers[req.params.num - 1]);
//   });

module.exports = router;