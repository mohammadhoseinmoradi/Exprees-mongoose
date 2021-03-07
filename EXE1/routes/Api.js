const express = require('express');
const router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
    console.log("00000000000000000000000")
    res.render('Home');
});

module.exports = router;