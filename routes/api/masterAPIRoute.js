const router = require('express').Router();
const commentRoutes = require('./comments');

router.use('/', commentRoutes);

module.exports = router;